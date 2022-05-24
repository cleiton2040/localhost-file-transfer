import { Request, Response } from 'express';
import { decode, encode } from '../Base64';
import moment from 'moment';
import fs from 'fs';

export default async function (req: Request, res: Response) {

    try {

        const path = (process.cwd() + '/files' + decode(req.query.folder as string || encode('/'))).replace(/\\/g, '/');
        const mode = fs.statSync(path).mode;

        if (mode == 16822) return res.send(getFolder(path));
        else return res.send(path);

    } catch (e) { res.status(500) }

}

function getFolder(path: string) {

    const data = fs.readdirSync(`${path}`).map(x => {

        const fileinfo = fs.statSync(path + `/${x}`)
        return {
            name: x,
            path: path + `/${x}`,
            size_bytes: fileinfo.size,
            createdIn: moment(fileinfo.ctimeMs - 1.08e+7).format('DD/MM/YYYY - HH:mm:ss'),
            modifiedIn: moment(fileinfo.mtimeMs - 1.08e+7).format('DD/MM/YYYY - HH:mm:ss'),
            type: fileinfo.mode === 16822 ? 'folder' : 'file'
        }

    })

    console.log(data)

    return data;

}