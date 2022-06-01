"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
function default_1(req, res, next) {
    const id = req.query.sessionId;
    const session = database_1.sessions.get(id || '');
    if (!id || !session)
        return res.status(401).send({ status: 401, message: "Usuário não logado" });
    else
        next();
}
exports.default = default_1;
