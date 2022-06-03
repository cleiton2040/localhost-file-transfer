import { QuickDB } from "quick.db"

export interface User {
    username: string
    password: string
    sessions: string[]
}

export interface Sessions {
    username: string, 
    password: string,
    in: number,
    ip: string,
    userAgent: string
}