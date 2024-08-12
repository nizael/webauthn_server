import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { ROUTING_INDEX } from '../routes'

const app = express()
  .use(express.json())
  .use(cors())
  .use(ROUTING_INDEX)
  
const PORT = process.env.PORT || 3004
const server = app.listen(PORT, () => console.log('Server listening on port ' + PORT))
server.timeout = 60000