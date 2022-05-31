"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(req, res) {
    console.log(req.get('User-Agent'));
    return res.sendFile('./public/index.html', { root: '.' });
}
exports.default = default_1;
