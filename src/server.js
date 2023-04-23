"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cosmetics_users_1 = __importDefault(require("./handlers/cosmetics_users"));
const cosmetics_products_1 = __importDefault(require("./handlers/cosmetics_products"));
const cosmetics_orders_1 = __importDefault(require("./handlers/cosmetics_orders"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
// app.get('/', function (req: Request, res: Response) {
//     res.send('Hello world');
// })
// app.get('/test-cors', cors(corsOptions), function (req: Request, res: Response, next) {
//     res.json({msg: 'This is CORS-enabled with a middle ware'})
// })
(0, cosmetics_users_1.default)(app);
(0, cosmetics_products_1.default)(app);
(0, cosmetics_orders_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
