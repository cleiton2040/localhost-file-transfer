import { Request, Response } from 'express';

export default async function(req: Request, res: Response) {

    console.log(req.get('User-Agent'));
    return res.sendFile('./public/index.html', { root: '.' })
}