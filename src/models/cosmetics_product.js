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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmeticsProduct = void 0;
const database_1 = __importDefault(require("../database"));
class CosmeticsProduct {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open database
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM cosmetics_products';
                const result = yield conn.query(sql);
                //close database
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get product details ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open database
                const sql = 'SELECT * FROM cosmetics_products WHERE id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                //close database
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find Product with id:${id} . Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open database
                const sql = 'INSERT INTO cosmetics_products (productName, price, productQuantity) VALUES($1, $2, $3) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [p.product_name, p.price, p.product_quantity]);
                const product = result.rows[0];
                //close database
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new product ${p.product_name}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //open database
                const sql = 'DELETE FROM cosmetics_products WHERE id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const product = result.rows[0];
                //close database
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not delete product with id:${id}. Error: ${err}`);
            }
        });
    }
}
exports.CosmeticsProduct = CosmeticsProduct;
