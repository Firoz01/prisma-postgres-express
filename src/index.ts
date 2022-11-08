import { PrismaClient } from '@prisma/client';
//import { PrismaClient } from '@prisma/PrismaClient';
import express,{Application, Request, Response} from 'express';

const prisma = new PrismaClient();
const app: Application = express();

app.use(express.json());

app.get('/users', async (req: Request, res: Response) => {
  console.log('get request');
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  console.log(req.body);
  const users = await prisma.user.create({
    data: { ...req.body },
  });

  res.json(users);
});

app.get('/users/:id', async (req: Request, res: Response) => {
  console.log('find one');
  const { id } = req.params;
  console.log(id);
  try {
    const users = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// ... your REST API routes will go here

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000')
);
