"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiMongoRouter_1 = require("./tsFiles/apiMongoRouter");
const serverAndMainRouter_1 = require("./tsFiles/serverAndMainRouter");
const app = (0, express_1.default)();
app.use(apiMongoRouter_1.mongoRouter);
app.use(serverAndMainRouter_1.server);
