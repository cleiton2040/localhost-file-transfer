import { User, Sessions } from "../typing/database";
import { QuickDB } from "quick.db";


const db = new QuickDB({ filePath: 'database.sqlite' });
const users = db.table('users') as QuickDB// | User;
const sessions = db.table('sessions') as QuickDB// | Sessions;
const logs = db.table('logs') as QuickDB;
const error = db.table('error')

export {
    users,
    sessions,
    logs,
    error
}