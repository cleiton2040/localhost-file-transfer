import { Request, Response } from 'express'; // @ts-ignore
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export default async function(req: Request, res: Response) {

    try {

        console.log(req)
        
        const form = new formidable.IncomigForm()

        form.parse(req, (err: any, fields: any, files: any) => { 
            const oldpath = files.filetoupload.path
            const newpath = process.cwd() + '/files'
        })

    } catch(e) {

    }
}