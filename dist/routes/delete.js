"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function default_1(req, res) {
    const path = req.body.path;
    if (!path)
        return res.status(404);
    const fileName = path.slice(1).replace(/\/|\\/g, '_');
    fs_1.default.renameSync(`${process.cwd()}\\files${path}`.replace(/\\/g, '/'), `${process.cwd()}\\deleted\\${fileName}`.replace(/\\/g, '/'));
}
exports.default = default_1;
