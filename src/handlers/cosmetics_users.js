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
const cosmetics_user_1 = require("../models/cosmetics_user");
const store = new cosmetics_user_1.CosmeticsStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.index();
    res.json(user);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.show(req.params.id);
    res.json(user);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newUser = yield store.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield store.delete(req.body.id);
    res.json(deleted);
});
const cosmetics_user_routes = (app) => {
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', create);
    app.delete('/user/:id', destroy);
};
exports.default = cosmetics_user_routes;
