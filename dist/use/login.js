"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
async function default_1(req, res, next) {
    const id = req.query.sessionId;
    const session = await database_1.sessions.get(id || '');
    if (req.path !== '/' && (!id || !session))
        return res.status(401).send({ status: 401, message: "Usuário não logado" });
    else {
        req.user = await database_1.users.get(session?.username || '') || {};
        next();
    }
}
exports.default = default_1;
