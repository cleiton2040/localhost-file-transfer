import { Request, Response } from 'express';
import { inspect } from 'util';

export default async function (req: Request, res: Response) {

    try {
        
        const time = req.body.time
        
        if (!time || time <= 0 || time >= 6.048e+8) return res.send({ status: 400 });
        
        req.database.users.set(`${req.user.username}.timeToAutoExit`, time);
        req.database.logs.push(`${req.user.username}`,
            {
                in: Date.now(),
                type: 6,
                newtime: time
            }
        )

        res.send({ status: 200 });

    } catch (e: any) {

        res.status(500).send({ status: 500, error: e.stack })

        req.database.error.set(`${Date.now()}`,
            {
                route: '/route',
                error: e.stack,
                req: inspect(req)
            }
        )

    }
}