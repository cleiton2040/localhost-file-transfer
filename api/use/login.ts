import { Request, Response, NextFunction } from 'express';
import { Sessions, User } from '../../typing/database';
import { sessions, users } from '../database';

export default async function(req: Request, res: Response, next: NextFunction) {

    const id = req.query.sessionId as string;
    const session = await sessions.get(id || '') as Sessions

    if (req.path !== '/' && (!id || !session)) return res.status(401).send({ status: 401, message: "Usuário não logado" })
    else {
        req.user = users.get(session.username)
        next();
    }

}

declare namespace Express {
    export interface Request {
        user?: User
    }
}