import { Request, Response, NextFunction } from 'express';
import { Sessions, User } from '../../typing/database';
import { sessions, users, logs, error } from '../database';

export default async function(req: Request, res: Response, next: NextFunction) {

    const id = req.cookies.sessionId as string;
    const session = await sessions.get(id || '') as Sessions;
    const pathAllowed = ['/', '/login/'].includes(req.path);

    if (!pathAllowed && !session) {
        res.status(401).send({ status: 401, message: "Usuário não logado" })
    }

    else {

        req.user = await users.get(session?.username || '') as User || {}
        req.database = { users, sessions, logs, error }
        next();

    }

}