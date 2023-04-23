"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmetics_order_1 = require("../models/cosmetics_order");
const storeOrder = new cosmetics_order_1.CosmeticsOrder();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield storeOrder.index();
    res.json(order);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield storeOrder.show(req.params.id);
    res.json(order);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            product_id: req.body.productId,
            user_id: req.body.price,
            product_quantity: req.body.productQuantity,
            order_status: req.body.orderStatus
        };
        const newOrder = yield storeOrder.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield storeOrder.delete(req.body.id);
    res.json(deleted);
});
const cosmetics_order_routes = (app) => {
    app.get('/order', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.delete('/order/:id', destroy);
};
exports.default = cosmetics_order_routes;
