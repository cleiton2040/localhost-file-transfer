import { Request, Response } from 'express';
import fs from 'fs';
import { inspect } from 'util';

export default async function (req: Request, res: Response) {

    try {

        const path = req.body.path as string;

        if (!path) return res.status(404);

        const fileName = path.slice(1).replace(/\/|\\/g, '_')

        fs.renameSync(
            `${process.cwd()}\\files${path}`.replace(/\\/g, '/'),
            `${process.cwd()}\\deleted\\(${Date.now()})-${fileName}`.replace(/\\/g, '/')
        )

        req.database.logs.push(`${req.user.username}`,
            {
                in: Date.now(),
                type: 4,
                path: req.body.path,
            }
        )

    } catch (e: any) {

        res.status(500).send({ status: 500, error: e.stack })

        req.database.error.set(`${Date.now()}`,
            {
                route: '/delete',
                error: e.stack,
                req: inspect(req)
            }
        )

    }

}