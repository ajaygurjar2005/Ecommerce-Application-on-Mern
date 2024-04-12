import express, { Router } from 'express'
import colors from 'colors'
import cors from 'cors'

import dotenv from 'dotenv'
import morgan from 'morgan'
import connect from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from "./routes/productRoute.js"


dotenv.config();
connect();

const app = express();

app.use(cors())


app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)


app.get('/',(req,res)=>{
    res.send({
        msg:"welcome to e-commerce project"
    })
})

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server running on ${port} `.bgCyan.white)
})