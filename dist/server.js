"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var cosmetics_users_1 = __importDefault(require("./handlers/cosmetics_users"));
var cosmetics_products_1 = __importDefault(require("./handlers/cosmetics_products"));
var cosmetics_orders_1 = __importDefault(require("./handlers/cosmetics_orders"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
//testing for initial request and response. (works fine)
app.get('/', function (req, res) {
    res.send('Hello world');
});
//testing that cors works with all requests and responses, with middleware. (works fine)
app.get('/test-cors', (0, cors_1.default)(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middle ware' });
});
//user routes. (works fine)
(0, cosmetics_users_1.default)(app);
//product routes. (does not work fine)
(0, cosmetics_products_1.default)(app);
//order routes. (does not work fine)
(0, cosmetics_orders_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
