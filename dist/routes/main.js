"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("./home"));
const getFolder_1 = __importDefault(require("./getFolder"));
const routes = [
    {
        fn: home_1.default,
        route: '/'
    },
    {
        fn: getFolder_1.default,
        route: '/getFolder'
    }
];
exports.default = routes;
