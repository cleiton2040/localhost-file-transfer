import { Request, Response } from 'express'; // @ts-ignore
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { decode } from '../Base64';

export default async function(req: Request, res: Response) {

    try {
        
        const form = new formidable.IncomingForm()
        
        form.parse(req, (err: any, fields: any, files: any) => { 
            const oldpath = files['files[]']._writeStream.path
            const newpath = process.cwd() + `/files${decode(req.query.path as 'a')}${files['files[]'].originalFilename}`.replace(/\\/g, '/');
            console.log(oldpath, newpath)
            fs.renameSync(oldpath, newpath)
        })

        res.send({ status: 200 })

    } catch(e) {

        console.log(e);

        res.send({ status: 500 })

    }
}