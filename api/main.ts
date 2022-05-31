import fs from 'fs';
import ip from './ip';
import routes from './routes/main';
import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

app.use('/public', express.static('public'));
app.use(express.json());

for (const x of routes) app[x.method as 'get' || 'get'](x.route, x.fn);

app.listen(8080, () => {
    console.log(`\x1b[32mListening in http://${ip.local}:${port}\x1b[0m`);
})