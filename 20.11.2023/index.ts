import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'
import { MongoClient, ServerApiVersion } from 'mongodb'

dotenv.config()

const app:Express = express()
const prisma:PrismaClient = new PrismaClient()
const port:string = String(process.env.PORT)

app.use(bodyParser.json())

const ERROR_404 = {"Error": "404"}

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
  "/data": "Dowolne dane z bazy MongoDB"
}
const url:string = String(process.env.MONGO_DATABASE_URL)
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.post('/data', async (req: Request, res: Response) => {
  const db = await client.db("api_20-11-2023")
  const message = req.body
  try{
    client.connect()
    const result = await db.collection("dataStorage").insertOne(message)
    res.json({"Message": "Dodano rekord"})
  }
  catch(e){
    console.log(e)
  }
})

app.get('/data', async (req: Request, res: Response) => {
  const db = await client.db("api_20-11-2023")
  try{
    client.connect()
    const result = await db.collection("dataStorage").find().toArray()
    res.json(result)  
  }
  catch(e){
    console.log(e)
  }
})

async function main() {
  app.get('/', (req: Request, res: Response) => {
    res.json(routes)
  })

  //Cars
  app.get('/cars', async (req: Request, res: Response) => {
    const results = await prisma.cars.findMany()
    res.json(results)
  })
  app.get('/cars/:id', async (req: Request, res: Response) => {
    const result = await prisma.cars.findUnique({where: {id: Number(req.params.id)}})
    if(result == null){
      res.json(ERROR_404)
    }
    else{
      res.json(result)
    }
  })
  app.post(`/cars`, async (req: Request, res: Response) => {
    const { brand, model, productionYear, registrationNumber, dealer } = req.body
    const result = await prisma.cars.create({
      data: {
        brand,
        model,
        productionYear,
        registrationNumber,
        dealer
      },
    })
    res.json(result)
  })
  app.put('/cars/:id', async (req, res) => {
    const { id } = req.params
    const { brand, model, productionYear, registrationNumber, dealer } = req.body
    const result = await prisma.cars.update({
      where: { id: Number(id) },
      data: {
        brand,
        model,
        productionYear,
        registrationNumber,
        dealer},
    })
    res.json(result)
  })
  app.delete(`/cars/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.cars.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })

  //Adresses
  app.get('/adresses', async (req: Request, res: Response) => {
    const results = await prisma.adresses.findMany()
    res.json(results)
  })
  app.get('/adresses/:id', async (req: Request, res: Response) => {
    const result = await prisma.adresses.findUnique({where: {id: Number(req.params.id)}})
    if(result == null){
      res.json(ERROR_404)
    }
    else{
      res.json(result)
    }
  })
  app.post(`/adresses`, async (req: Request, res: Response) => {
    const { adress } = req.body
    const result = await prisma.adresses.create({
      data: {
        adress
      },
    })
    res.json(result)
  })
  app.put('/adresses/:id', async (req, res) => {
    const { id } = req.params
    const { adress } = req.body
    const result = await prisma.adresses.update({
      where: { id: Number(id) },
      data: {
        adress
      },
    })
    res.json(result)
  })
  app.delete(`/adresses/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.adresses.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })

  //Dealers
  app.get('/dealers', async (req: Request, res: Response) => {
    const results = await prisma.dealers.findMany()
    res.json(results)
  })
  app.get('/dealers/:id', async (req: Request, res: Response) => {
    const result = await prisma.dealers.findUnique({where: {id: Number(req.params.id)}})
    if(result == null){
      res.json(ERROR_404)
    }
    else{
      res.json(result)
    }
  })
  app.post(`/dealers`, async (req: Request, res: Response) => {
    const { name, adress } = req.body
    const result = await prisma.dealers.create({
      data: {
        name,
        adress
      },
    })
    res.json(result)
  })
  app.put('/dealers/:id', async (req, res) => {
    const { id } = req.params
    const { name, adress } = req.body
    const result = await prisma.dealers.update({
      where: { id: Number(id) },
      data: {
        name,
        adress
      },
    })
    res.json(result)
  })
  app.delete(`/dealers/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.dealers.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })

  //Clients
  app.get('/clients', async (req: Request, res: Response) => {
    const results = await prisma.clients.findMany()
    res.json(results)
  })
  app.get('/clients/:id', async (req: Request, res: Response) => {
    const result = await prisma.clients.findUnique({where: {id: Number(req.params.id)}})
    if(result == null){
      res.json(ERROR_404)
    }
    else{
      res.json(result)
    }
  })
  app.post(`/clients`, async (req: Request, res: Response) => {
    const { name } = req.body
    const result = await prisma.clients.create({
      data: {
        name
      },
    })
    res.json(result)
  })
  app.put('/clients/:id', async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const result = await prisma.clients.update({
      where: { id: Number(id) },
      data: {
        name
      },
    })
    res.json(result)
  })
  app.delete(`/clients/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.clients.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })

  //Sales
  app.get('/sales', async (req: Request, res: Response) => {
    const results = await prisma.sales.findMany()
    res.json(results)
  })
  app.get('/sales/:id', async (req: Request, res: Response) => {
    const result = await prisma.sales.findUnique({where: {id: Number(req.params.id)}})
    if(result == null){
      res.json(ERROR_404)
    }
    else{
      res.json(result)
    }
  })
  app.post(`/sales`, async (req: Request, res: Response) => {
    const { client, price, dealer } = req.body
    const result = await prisma.sales.create({
      data: {
        client,
        price,
        dealer
      },
    })
    res.json(result)
  })
  app.put('/sales/:id', async (req, res) => {
    const { id } = req.params
    const { client, price, dealer } = req.body
    const result = await prisma.sales.update({
      where: { id: Number(id) },
      data: {
        client,
        price,
        dealer
      },
    })
    res.json(result)
  })
  app.delete(`/sales/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.sales.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })

  //Test Drives
  app.get('/testdrives', async (req: Request, res: Response) => {
    const results = await prisma.testdrives.findMany()
    res.json(results)
  })
  app.get('/testdrives/:id', async (req: Request, res: Response) => {
    const result = await prisma.testdrives.findUnique({where: {id: Number(req.params.id)}})
    if(result == null){
      res.json(ERROR_404)
    }
    else{
      res.json(result)
    }
  })
  app.post(`/testdrives`, async (req: Request, res: Response) => {
    const { clientsId, carsId, drivesDate } = req.body
    const result = await prisma.testdrives.create({
      data: {
        clientsId,
        carsId,
        drivesDate
      },
    })
    res.json(result)
  })
  app.put('/testdrives/:id', async (req, res) => {
    const { id } = req.params
    const { clientsId, carsId, drivesDate } = req.body
    const result = await prisma.testdrives.update({
      where: { id: Number(id) },
      data: {
        clientsId,
        carsId,
        drivesDate
      },
    })
    res.json(result)
  })
  app.delete(`/testdrives/:id`, async (req, res) => {
    const { id } = req.params
    const result = await prisma.testdrives.delete({
      where: {
        id: Number(id),
      },
    })
    res.json(result)
  })


  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 