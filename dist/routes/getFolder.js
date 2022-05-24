"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base64_1 = require("../Base64");
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
async function default_1(req, res) {
    try {
        const path = (process.cwd() + '/files' + (0, Base64_1.decode)(req.query.folder || (0, Base64_1.encode)('/'))).replace(/\\/g, '/');
        const mode = fs_1.default.statSync(path).mode;
        if (mode == 16822)
            return res.send(getFolder(path));
        else
            return res.send(path);
    }
    catch (e) {
        res.status(500);
    }
}
exports.default = default_1;
function getFolder(path) {
    const data = fs_1.default.readdirSync(`${path}`).map(x => {
        const fileinfo = fs_1.default.statSync(path + `/${x}`);
        return {
            name: x,
            path: path + `/${x}`,
            size_bytes: fileinfo.size,
            createdIn: (0, moment_1.default)(fileinfo.ctimeMs - 1.08e+7).format('DD/MM/YYYY - HH:mm:ss'),
            modifiedIn: (0, moment_1.default)(fileinfo.mtimeMs - 1.08e+7).format('DD/MM/YYYY - HH:mm:ss'),
            type: fileinfo.mode === 16822 ? 'folder' : 'file'
        };
    });
    console.log(data);
    return data;
}
