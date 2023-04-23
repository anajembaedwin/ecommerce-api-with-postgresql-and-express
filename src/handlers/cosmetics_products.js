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
const cosmetics_product_1 = require("../models/cosmetics_product");
const storeProduct = new cosmetics_product_1.CosmeticsProduct();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield storeProduct.index();
    res.json(product);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield storeProduct.show(req.params.id);
    res.json(product);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            product_name: req.body.productName,
            price: req.body.price,
            product_quantity: req.body.productQuantity,
        };
        const newProduct = yield storeProduct.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield storeProduct.delete(req.body.id);
    res.json(deleted);
});
const cosmetics_product_routes = (app) => {
    app.get('/product', index);
    app.get('/product/:id', show);
    app.post('/product', create);
    app.delete('/product/:id', destroy);
};
exports.default = cosmetics_product_routes;
