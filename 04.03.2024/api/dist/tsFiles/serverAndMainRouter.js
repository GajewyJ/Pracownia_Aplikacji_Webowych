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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.server = app;
const prisma = new client_1.PrismaClient();
const port = Number(process.env.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const ERROR_404 = { "Error": "404" };
const routes = {
    "/cars": "Samochody",
    "/cars/id": "Samochód o podanym id",
    "/adresses": "Adresy",
    "/adresses/id": "Adres o podanym id",
    "/dealers": "Dealerzy",
    "/dealers/id": "Dealer o podanym id",
    "/clients": "Klienci",
    "/clients/id": "Klient o podanym id",
    "/sales": "Transakcje",
    "/sales/id": "Transakcja o podanym id",
    "/testdrives": "Jazdy Testowe",
    "/testdrives/id": "Jazda Testowa o podanym id",
    "/api/dowolnaNazwaKolekcji": "Dane z kolekcji z bazy MongoDB"
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/', (req, res) => {
            res.json(routes);
        });
        //Cars
        app.get('/cars', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma.cars.findMany();
            res.json(results);
        }))
            .post(`/cars`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { brand, model, productionYear, registrationNumber, dealer } = req.body;
            try {
                const car = yield prisma.cars.create({
                    data: {
                        brand,
                        model,
                        productionYear,
                        registrationNumber,
                        dealer
                    }
                });
                res.status(201).json(car);
            }
            catch (error) {
                res.status(400).json({ error: "Nie można dodać samochodu do bazy" });
            }
        }));
        app.get('/cars/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.cars.findUnique({ where: { id: Number(req.params.id) } });
            if (result == null) {
                res.status(404).json(ERROR_404);
            }
            else {
                res.json(result);
            }
        }))
            .put('/cars/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { brand, model, productionYear, registrationNumber, dealer } = req.body;
            const result = yield prisma.cars.update({
                where: { id: Number(id) },
                data: {
                    brand,
                    model,
                    productionYear,
                    registrationNumber,
                    dealer
                },
            });
            res.json(result);
        }))
            .delete(`/cars/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield prisma.cars.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(result);
        }));
        //Adresses
        app.get('/adresses', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma.adresses.findMany();
            res.json(results);
        }))
            .post(`/adresses`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { adress } = req.body;
            const result = yield prisma.adresses.create({
                data: {
                    adress
                },
            });
            res.json(result);
        }));
        app.get('/adresses/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.adresses.findUnique({ where: { id: Number(req.params.id) } });
            if (result == null) {
                res.status(404).json(ERROR_404);
            }
            else {
                res.json(result);
            }
        }))
            .put('/adresses/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { adress } = req.body;
            const result = yield prisma.adresses.update({
                where: { id: Number(id) },
                data: {
                    adress
                },
            });
            res.json(result);
        }))
            .delete(`/adresses/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield prisma.adresses.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(result);
        }));
        //Dealers
        app.get('/dealers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma.dealers.findMany();
            res.json(results);
        }))
            .post(`/dealers`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, adress } = req.body;
            const result = yield prisma.dealers.create({
                data: {
                    name,
                    adress
                },
            });
            res.json(result);
        }));
        app.get('/dealers/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.dealers.findUnique({ where: { id: Number(req.params.id) } });
            if (result == null) {
                res.status(404).json(ERROR_404);
            }
            else {
                res.json(result);
            }
        }))
            .put('/dealers/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, adress } = req.body;
            const result = yield prisma.dealers.update({
                where: { id: Number(id) },
                data: {
                    name,
                    adress
                },
            });
            res.json(result);
        }))
            .delete(`/dealers/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield prisma.dealers.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(result);
        }));
        //Clients
        app.get('/clients', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma.clients.findMany();
            res.json(results);
        }))
            .post(`/clients`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const result = yield prisma.clients.create({
                data: {
                    name
                },
            });
            res.json(result);
        }));
        app.get('/clients/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.clients.findUnique({ where: { id: Number(req.params.id) } });
            if (result == null) {
                res.status(404).json(ERROR_404);
            }
            else {
                res.json(result);
            }
        }))
            .put('/clients/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            const result = yield prisma.clients.update({
                where: { id: Number(id) },
                data: {
                    name
                },
            });
            res.json(result);
        }))
            .delete(`/clients/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield prisma.clients.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(result);
        }));
        //Sales
        app.get('/sales', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma.sales.findMany();
            res.json(results);
        }))
            .post(`/sales`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { client, price, dealer } = req.body;
            const result = yield prisma.sales.create({
                data: {
                    client,
                    price,
                    dealer
                },
            });
            res.json(result);
        }));
        app.get('/sales/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.sales.findUnique({ where: { id: Number(req.params.id) } });
            if (result == null) {
                res.status(404).json(ERROR_404);
            }
            else {
                res.json(result);
            }
        }))
            .put('/sales/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { client, price, dealer } = req.body;
            const result = yield prisma.sales.update({
                where: { id: Number(id) },
                data: {
                    client,
                    price,
                    dealer
                },
            });
            res.json(result);
        }))
            .delete(`/sales/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield prisma.sales.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(result);
        }));
        //Test Drives
        app.get('/testdrives', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const results = yield prisma.testdrives.findMany();
            res.json(results);
        }))
            .post(`/testdrives`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { clientsId, carsId, drivesDate } = req.body;
            const result = yield prisma.testdrives.create({
                data: {
                    clientsId,
                    carsId,
                    drivesDate
                },
            });
            res.json(result);
        }));
        app.get('/testdrives/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma.testdrives.findUnique({ where: { id: Number(req.params.id) } });
            if (result == null) {
                res.status(404).json(ERROR_404);
            }
            else {
                res.json(result);
            }
        }))
            .put('/testdrives/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { clientsId, carsId, drivesDate } = req.body;
            const result = yield prisma.testdrives.update({
                where: { id: Number(id) },
                data: {
                    clientsId,
                    carsId,
                    drivesDate
                },
            });
            res.json(result);
        }))
            .delete(`/testdrives/:id`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield prisma.testdrives.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(result);
        }));
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
