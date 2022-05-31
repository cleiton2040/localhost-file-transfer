"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.users = void 0;
const quick_db_1 = require("quick.db");
const db = new quick_db_1.QuickDB();
const users = db.table('users');
exports.users = users;
const sessions = db.table('sessions');
exports.sessions = sessions;
