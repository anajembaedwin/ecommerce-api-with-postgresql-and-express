"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, POSTGRES_DB_PROD, ENV, } = process.env;
let Client = new pg_1.Pool(); // Initialize with default value
console.log(ENV);
if (ENV === 'test') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'dev') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'prod') {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_PROD,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = Client;
