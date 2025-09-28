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
const FRONTEND = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/+$/, '');

// Replace this:
app.use(cors({
  origin: FRONTEND,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// With this robust dynamic checker (preferred)
const FRONTENDS = (process.env.FRONTEND_URLS || FRONTEND)
  .split(',')
  .map(s => s.trim().replace(/\/+$/, ''))
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests (server-to-server, curl) which have no origin
    if (!origin) return callback(null, true);
    if (FRONTENDS.includes(origin.replace(/\/+$/, ''))) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

app.use('/api/auth',authRoutes)
app.use('/api/item',itemRoutes)
app.use('/api/food',foodRoutes)
module.exports=app;