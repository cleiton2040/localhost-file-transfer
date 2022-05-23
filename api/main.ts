import fs from 'fs';
import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => res.redirect('http://'))