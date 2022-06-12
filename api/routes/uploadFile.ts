import { Request, Response } from 'express'; // @ts-ignore
import formidable from 'formidable';
import fs from 'fs';
import { decode } from '../Base64';
import { inspect } from 'util';

export default async function (req: Request, res: Response) {

    try {

        const form = new formidable.IncomingForm()

        form.parse(req, (err: any, fields: any, files: any) => {
            const oldpath = files['files[]']._writeStream.path
            const newpath = process.cwd() + `/files${decode(req.query.path as 'a')}${files['files[]'].originalFilename}`.replace(/\\/g, '/');
            fs.renameSync(oldpath, newpath)
        })

        res.send({ status: 200 })

        req.database.logs.push(`${req.user.username}`,
            {
                type: 3,
                create: 'file',
                path: req.query.path,
                in: Date.now()
            }
        )

    } catch (e: any) {

        res.status(500).send({ status: 500, error: e.stack })

        req.database.error.set(`${Date.now()}`,
            {
                route: '/uploadFile',
                error: e.stack,
                req: inspect(req)
            }
        )

    }
}