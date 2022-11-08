"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
//import { PrismaClient } from '@prisma/PrismaClient';
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/users', async (req, res) => {
    console.log('get request');
    const users = await prisma.user.findMany();
    res.json(users);
});
app.post('/users', async (req, res) => {
    console.log(req.body);
    const users = await prisma.user.create({
        data: { ...req.body },
    });
    res.json(users);
});
app.get('/users/:id', async (req, res) => {
    console.log('find one');
    const { id } = req.params;
    console.log(id);
    try {
        const users = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        res.json(users);
    }
    catch (error) {
        console.log(error);
    }
});
// ... your REST API routes will go here
app.listen(3000, () => console.log('REST API server ready at: http://localhost:3000'));
//# sourceMappingURL=index.js.map