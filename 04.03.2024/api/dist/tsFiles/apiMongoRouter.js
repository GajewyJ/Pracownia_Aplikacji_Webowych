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
exports.mongoRouter = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
exports.mongoRouter = router;
router.use((req, res, next) => {
    next();
});
dotenv_1.default.config();
router.use(express_1.default.json());
const ERROR_404 = { "Error": "404" };
const url = String(process.env.MONGO_DATABASE_URL);
const client = new mongodb_1.MongoClient(url, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
router.post('/api/:kolekcja', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield client.db("api_20-11-2023");
    const message = req.body;
    const collName = String(req.params.kolekcja);
    try {
        client.connect();
        yield db.collection(String(req.params.kolekcja)).insertOne(message);
        res.json({ "Message": "Dodano rekord" });
    }
    catch (e) {
        console.log(e);
    }
}))
    .get('/api/:kolekcja', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield client.db("api_20-11-2023");
    try {
        client.connect();
        const result = yield db.collection(String(req.params.kolekcja)).find().toArray();
        if (result == null) {
            res.json(ERROR_404);
        }
        res.json(result);
    }
    catch (e) {
        console.log(e);
    }
}));
