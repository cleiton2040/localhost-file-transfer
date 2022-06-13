import { Request, Response } from 'express';
import { inspect } from 'util';
import { mkdirSync, existsSync } from 'fs';

export default async function (req: Request, res: Response) {

    try {

        const createIn = req.body.path
        const foldername = req.body.folderName
        const path = `${process.cwd()}/files${createIn}${foldername}`;

        if (+req.user.level < 2) return res.status(401).send({ status: 401 });
        if (!foldername) return res.status(400).send({ status: 400 });
        if (!existsSync(path)) mkdirSync(path);

        res.send({ status: 200 })

        req.database.logs.push(`${req.user.username}`,
            {
                in: Date.now(),
                type: 3,
                path: req.body.path,
                create: 'folder'
            }
        )

    } catch (e: any) {

        res.status(500).send({ status: 500, error: e.stack })

        req.database.error.set(`${Date.now()}`,
            {
                route: '/createFolder',
                error: e.stack,
                req: inspect(req)
            }
        )

    }
}