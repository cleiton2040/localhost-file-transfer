import { Request, Response } from 'express';
import { decode, encode } from '../Base64';
import moment from 'moment';
import fs from 'fs';

export default async function(req: Request, res: Response) {
    const folder = (process.cwd() + '/files' + decode(req.query.folder as string || encode('/'))).replace(/\\/g, '/');
    const data = fs.readdirSync(`${folder}`).map(x => {
        const fileinfo = fs.statSync(folder + `/${x}`)
        return {
            name: x,
            path: folder + `/${x}`,
            size_bytes: fileinfo.size,
            createdIn: moment(fileinfo.ctimeMs - 1.08e+7).format('DD/MM/YYYY - HH:mm:ss'),
            modifiedIn: moment(fileinfo.mtimeMs - 1.08e+7).format('DD/MM/YYYY - HH:mm:ss'),
            type: fileinfo.mode === 16822? 'folder':'file'
        }
    })
    console.log(decode(folder), data)
}