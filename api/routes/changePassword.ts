import { Request, Response } from 'express';
import { inspect } from 'util';

export default async function (req: Request, res: Response) {

    try {
        
        const senhaAtual = req.body.senhaAtual;
        const senhaNova = req.body.newPassword;

        if (!senhaAtual || !senhaNova || senhaAtual.length < 4 || senhaNova.length < 4) return res.send({ status: 400 })
        if (senhaAtual != req.user.password) return res.send({ status: 401 })

        req.database.users.set(`${req.user.username}.password`, senhaNova)
        req.database.logs.push(`${req.user.username}`, {
            in: Date.now(),
            type: 5
        })
        
        res.send({ status: 200 });

    } catch (e: any) {

        res.status(500).send({ status: 500, error: e.stack })

        req.database.error.set(`${Date.now()}`,
            {
                route: '/changePassword',
                error: e.stack,
                req: inspect(req)
            }
        )

    }
}