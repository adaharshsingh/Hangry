const express= require('express');
const cookieParser= require('cookie-parser')
const authRoutes= require('./routes/auth.routes')
const itemRoutes= require('./routes/item.routes')
const foodRoutes= require('./routes/food.routes')
const cors =require('cors')

const app= express();

app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("Hello world");
})
const FRONTEND = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use('/api/auth',authRoutes)
app.use('/api/item',itemRoutes)
app.use('/api/food',foodRoutes)
module.exports=app;