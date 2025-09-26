const express= require('express');
const cookieParser= require('cookie-parser')
const authRoutes= require('./routes/auth.routes')
const itemRoutes= require('./routes/item.routes')

const app= express();

app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use('/api/auth',authRoutes)
app.use('/api/item',itemRoutes)
module.exports=app;