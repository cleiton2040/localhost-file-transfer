import { QuickDB } from "quick.db";

const db = new QuickDB();
const users = db.table('users');
const sessions = db.table('sessions');

export {
    users,
    sessions
}