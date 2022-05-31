"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = __importDefault(require("./home"));
const delete_1 = __importDefault(require("./delete"));
const getFolder_1 = __importDefault(require("./getFolder"));
const login_1 = __importDefault(require("./login"));
const routes = [
    {
        fn: home_1.default,
        route: '/'
    },
    {
        fn: getFolder_1.default,
        route: '/getFolder'
    },
    {
        fn: delete_1.default,
        route: '/delete',
        method: 'delete'
    },
    {
        fn: login_1.default,
        route: ('/login')
    }
];
exports.default = routes;
