import { Request, Response } from 'express';
import { decode, encode } from '../Base64'; // @ts-ignore
import { lookup } from 'mime-types';
import moment from 'moment';
import fs from 'fs';

export default async function (req: Request, res: Response) {

    const path = req.body.path as string;

    if (!path) return res.status(404);

    const fileName = path.slice(1).replace(/\/|\\/g, '___')

    fs.renameSync(
        `\\files${path}`, 
        `\\deleted\\${fileName}`.replace(/\\/g, '/'))

}