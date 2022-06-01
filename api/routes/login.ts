import { Request, Response } from 'express';
import { users, sessions } from '../database';
import { decode } from '../Base64';

export default async function(req: Request, res: Response) {

    const username = req.query.username as string;
    const password = req.query.password as string;

    const user = await users.get(username) as any
    const hash = decode(`${Date.now()}-${Math.random()}`)

    if (!username || !password || user?.password !== password) return res.status(401).send({ status: 401, message: 'login or password incorrect'})

    sessions.set(
        hash, 
        {
            login: req.query.username, 
            password: req.query.password,
            in: Date.now(),
            ip: req.socket.localAddress || req.ip,
            userAgent: req.get('User-Agent')
        }
    )

    users.push('sessions', hash)

    res.status(200).send({ hash })

}