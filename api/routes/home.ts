import { Request, Response } from 'express';

export default async function(req: Request, res: Response) {
    return res.sendFile('./public/index.html', { root: '.' })
}