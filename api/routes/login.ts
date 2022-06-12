import { Request, Response } from 'express';
import { users, sessions, logs } from '../database';
import { inspect } from 'util';

export default async function (req: Request, res: Response) {

    try {

        const username = req.query.username as string;
        const password = req.query.password as string;

        const user = await users.get(username) as any
        const hash = `${Date.now() * Math.random()}`

        if (!username || !password || user?.password !== password) return res.status(401).send({ status: 401, message: 'login or password incorrect' })

        sessions.set(
            hash,
            {
                username: req.query.username,
                password: req.query.password,
                in: Date.now(),
                ip: req.socket.localAddress || req.ip,
                userAgent: req.get('User-Agent')
            }
        )

        delete user.password;

        users.push(`${user.username}.sessions`, hash);
        user.sessions.push(hash);

        res.cookie('user', JSON.stringify(user), { maxAge: 1000 * 60 * 30, signed: false, path: '/' })
        res.cookie('sessionId', hash, { maxAge: 1000 * 60 * 30, signed: false, path: '/' })

        res.status(200).send({ status: 200 })

        req.database.logs.push(`${user.username}`,
            {
                in: Date.now(),
                type: 1,
                sessionId: hash,
            }
        )

    } catch (e: any) {

        res.status(500).send({ status: 500, error: e.stack })

        req.database.error.set(`${Date.now()}`,
            {
                route: '/login',
                error: e.stack,
                req: inspect(req)
            }
        )

    }
}