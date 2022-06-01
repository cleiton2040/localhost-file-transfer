import { QuickDB } from "quick.db"

export interface User {
    username: string
    password: string
    entries: string[]
}

export interface Sessions {
    username: string, 
    password: string,
    in: number,
    ip: string,
    userAgent: string
}