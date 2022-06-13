import { Request, Response } from 'express';
import fs, { existsSync } from 'fs';
import { inspect } from 'util';

export default async function (req: Request, res: Response) {

    try {

        if (+req.user.level < 2) return res.status(401).send({ status: 401 });

        const path = req.body.path as string;
        const fileName = path.slice(1).replace(/\/|\\/g, '_')

        if (!path) return res.status(400).send({ status: 400, message: "Insira o caminho do item." });
        if (!existsSync(`./files${path}`)) return res.status(404).send({ status: 404, message: "Item não existe."});

        fs.renameSync(
            `./files${path}`.replace(/\\/g, '/'),
            `./deleted/(${Date.now()})-${fileName}`.replace(/\\/g, '/')
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