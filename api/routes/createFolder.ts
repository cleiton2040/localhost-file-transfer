import { Request, Response } from 'express';
import { inspect } from 'util';
import { mkdirSync, existsSync } from 'fs';

export default async function (req: Request, res: Response) {

    try {

        console.log(req.body)
        const createIn = req.body.path
        const foldername = req.body.folderName

        const path = `${process.cwd()}/files${createIn}${foldername}`;

        if (!existsSync(path)) mkdirSync(path);

        res.send({ status: 200 })

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