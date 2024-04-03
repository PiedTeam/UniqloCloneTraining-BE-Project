import express from 'express'
import userRouter from './routes/users.routers'
import databaseServices from './services/database.services'
////////////////////////
const app = express()
const port = 3000

// Connect to MongoDB
databaseServices.connect()

app.use(express.json())
app.use('/users', userRouter)
export default app

app.get('/', (req, res) => {
  res.send('hello project Uniqlo')
})

// Listen to port
app.listen(port, () => {
  console.log(`Project uniqlo run in post ${port}`)
})
