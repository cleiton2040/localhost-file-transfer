"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ip_1 = __importDefault(require("./ip"));
const main_1 = __importDefault(require("./routes/main"));
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./use/login"));
const app = (0, express_1.default)();
const port = 8080;
app.use('/public', express_1.default.static('public'));
app.use(express_1.default.json());
app.use(login_1.default);
for (const x of main_1.default)
    app[x.method || 'get'](x.route, x.fn);
app.listen(8080, () => {
    console.log(`\x1b[32mListening in http://${ip_1.default.local}:${port}\x1b[0m`);
});
