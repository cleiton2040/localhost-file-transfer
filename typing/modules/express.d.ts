import { Request } from 'express';
import { QuickDB } from 'quick.db';
import { User } from '../database';

declare module 'express' {
    export interface Request {
        user: User
        database: {
            users: QuickDB,
            sessions: QuickDB,
            logs: QuickDB,
            error: QuickDB
        }
        sessionId: string
    }
}