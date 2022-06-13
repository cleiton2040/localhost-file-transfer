import { Request, Response, NextFunction } from 'express';
import { Sessions, User } from '../../typing/database';
import { sessions, users, logs, error } from '../database';

export default async function (req: Request, res: Response, next: NextFunction) {

    const id = req.cookies.sessionId as string;
    const session = await sessions.get(id || '') as Sessions;
    const user = await users.get(session?.username || '') as User || {};
    const pathAllowed = ['/', '/login/'].includes(req.params[0]);

    if (session && user && user.sessions.includes(id) || pathAllowed) {

        req.sessionId = id;
        req.user = user
        req.database = { users, sessions, logs, error }

        if (session && user && Date.now() < (session?.lastTime + user?.timeToAutoExit)) req.database.sessions.set(`${id}.lastTime`, Date.now())
        else {
            res.clearCookie('sessionId');
            req.database.sessions.set(id, {
                lastTime: null,
                active: false
            })
        }

        if (req.user) return next();
        else return res.status(401).send({ status: 401 })

    } else return res.status(401).send({ status: 401, message: "Usuário não logado" })


}