import express from 'express'
import userRouter from './routes/users.routers'
import databaseServices from './services/database.services'
import productRouter from './routes/product.routers'
import searchRouter from './routes/sreach.routers'
////////////////////////
const app = express()
const port = 3000

// Connect to MongoDB
databaseServices.connect()
databaseServices.indexProducts()

app.use(express.json())
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/search', searchRouter)
export default app

app.get('/', (req, res) => {
  res.send('hello project Uniqlo')
})

// Listen to port
app.listen(port, () => {
  console.log(`Project uniqlo run in post ${port}`)
})
