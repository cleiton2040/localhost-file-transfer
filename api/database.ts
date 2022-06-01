import { User, Sessions } from "../typing/database";
import { QuickDB } from "quick.db";

const db = new QuickDB();
const users = db.table('users') as QuickDB// | User;
const sessions = db.table('sessions') as QuickDB// | Sessions;

export {
    users,
    sessions
}