import { Request, Response } from 'express';

export default function(req: Request, res: Response) {

    req.user.password = '';

    res.cookie('user', req.user).send(req.user)

}