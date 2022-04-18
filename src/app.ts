import express from 'express'
import config from 'config'
import dotenv from 'dotenv'

import connectToDB from './utils/connectToDB'

import router from './routes'
dotenv.config()

const app = express()
app.use(router)

const port = config.get<number>('port')

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)

  void connectToDB()
})
