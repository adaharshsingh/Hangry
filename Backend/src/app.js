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

// Support multiple frontend URLs (comma-separated) from env, or use defaults
const DEFAULT_FRONTENDS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  process.env.FRONTEND_URL || 'https://hangry-alpha.vercel.app'
];

const FRONTEND_URLS = process.env.FRONTEND_URLS 
  ? process.env.FRONTEND_URLS.split(',').map(s => s.trim()).filter(Boolean)
  : DEFAULT_FRONTENDS;

// CORS configuration with dynamic origin checker
app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests (server-to-server, curl) which have no origin
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed frontend
    const isAllowed = FRONTEND_URLS.some(frontend => {
      const normalizedFrontend = frontend.replace(/\/+$/, '');
      const normalizedOrigin = origin.replace(/\/+$/, '');
      return normalizedOrigin === normalizedFrontend;
    });
    
    if (isAllowed) return callback(null, true);
    
    console.warn(`CORS request blocked from origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 3600
}));

app.use('/api/auth',authRoutes)
app.use('/api/item',itemRoutes)
app.use('/api/food',foodRoutes)
module.exports=app;