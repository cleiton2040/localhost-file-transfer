"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const Base64_1 = require("../Base64");
async function default_1(req, res) {
    const username = req.query.username;
    const password = req.query.password;
    const user = await database_1.users.get(username);
    const hash = (0, Base64_1.decode)(`${Date.now()}-${Math.random()}`);
    console.log(user);
    if (!username || !password || user?.password !== password)
        return res.status(401).send({ status: 401, message: 'login or password incorrect' });
    database_1.sessions.set(hash, {
        username: req.query.username,
        password: req.query.password,
        in: Date.now(),
        ip: req.socket.localAddress || req.ip,
        userAgent: req.get('User-Agent')
    });
    database_1.users.push('sessions', hash);
    res.status(200).send({ hash, user, status: 200 });
}
exports.default = default_1;
