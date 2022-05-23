"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
const decode = (str) => Buffer.from(str, 'base64').toString('ascii');
exports.decode = decode;
const encode = (str) => Buffer.from(str).toString('base64');
exports.encode = encode;
