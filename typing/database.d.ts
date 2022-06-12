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

type logs = {
    1: 'fez login',
    2: 'acessou um arquivo/pasta',
    3: 'criou um arquivo/pasta',
    4: 'deletou um arquivo/pasta',
    5: 'alterou senha',
    6: 'alterou nome'
}