import express, { Express, Request, Response } from 'express'
import { mongoRouter } from './tsFiles/apiMongoRouter'
import { server } from './tsFiles/serverAndMainRouter'

const app:Express = express()

app.use(mongoRouter)
app.use(server)