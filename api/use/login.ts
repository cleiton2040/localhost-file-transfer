import { Request, Response, NextFunction } from 'express';
import { User } from '../../typing/database';

export default function(req: Request, res: Response, next: NextFunction) {
    
}

declare namespace express {
    export interface Request {
        user: User
    }
}