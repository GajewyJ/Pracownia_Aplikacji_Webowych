import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from 'mongodb'

const router = express.Router()

router.use((req, res, next) =>{
    next()
})

dotenv.config()
router.use(express.json())

const ERROR_404 = {"Error": "404"}

const url:string = String(process.env.MONGO_DATABASE_URL)
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.post('/api/:kolekcja', async (req: Request, res: Response) => {
  const db = await client.db("api_20-11-2023")
  const message = req.body
  const collName: String = String(req.params.kolekcja)
  try{
    client.connect()
    await db.collection(String(req.params.kolekcja)).insertOne(message)
    res.json({"Message": "Dodano rekord"})
  }
  catch(e){
    console.log(e)
  }
})
.get('/api/:kolekcja', async (req: Request, res: Response) => {
  console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  const db = await client.db("api_20-11-2023")
  try{
    client.connect()
    const result = await db.collection(String(req.params.kolekcja)).find().toArray()
    if(result == null){
      res.json(ERROR_404)
    }
    res.json(result)  
  }
  catch(e){
    console.log(e)
  }
})

export {router as mongoRouter}