# Hangry - Food Discovery Platform

A full-stack application for discovering and sharing food items. Food partners can create and manage their food items, while users can discover, like, and save their favorite foods.

**Live URLs:**
- Frontend: https://hangry-alpha.vercel.app
- Backend API: https://hangry-5t00.onrender.com

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB Atlas account (or local MongoDB)
- Git

## 🚀 Quick Start

### Backend Setup

```bash
cd Backend
npm install

# Create .env file with required variables
cp .env.example .env
# Edit .env with your actual values
```

**Backend Environment Variables:**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secure_random_string
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install

# Create .env.local for development
cp .env.example .env.local

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend Environment Variables:**
```env
VITE_API=http://localhost:3000  # Development
VITE_API=https://hangry-5t00.onrender.com  # Production
```

## 📦 Project Structure

```
Hangry/
├── Backend/
│   ├── src/
│   │   ├── app.js              # Express app setup
│   │   ├── controllers/        # Route handlers
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Custom middleware
│   │   ├── services/           # Business logic
│   │   └── db/                 # Database connection
│   ├── server.js               # Entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/         # React components
    │   ├── pages/              # Page components
    │   ├── contexts/           # React contexts
    │   ├── routes/             # Route definitions
    │   ├── App.jsx             # Main App component
    │   └── main.jsx            # Entry point
    ├── vite.config.js          # Vite configuration
    ├── tailwind.config.js      # Tailwind CSS config
    └── package.json
```

## 🔑 Key Features

- **User Authentication**: Secure JWT-based auth with cookies
- **Food Discovery**: Browse and discover food items
- **User Management**: Like and save favorite foods
- **Food Partner Dashboard**: Create and manage food items
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Real-time Updates**: Framer Motion animations
- **Theme Support**: Dark mode ready

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite (build tool)
- Tailwind CSS
- Framer Motion
- Axios
- React Router v7

**Backend:**
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Multer (file uploads)
- ImageKit (image hosting)

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/user/register` - User registration
- `POST /api/auth/user/login` - User login
- `POST /api/auth/food/register` - Food partner registration
- `POST /api/auth/food/login` - Food partner login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/user/me` - Get user profile
- `GET /api/auth/food-partner/me` - Get food partner profile

### Item Endpoints
- `GET /api/item` - Get all items
- `POST /api/item` - Create item (food partner only)
- `PUT /api/item/:id` - Update item
- `DELETE /api/item/:id` - Delete item
- `POST /api/item/like` - Like an item
- `POST /api/item/save` - Save an item

### Food Partner Endpoints
- `GET /api/food/:id` - Get food partner details
- `GET /api/food` - Get all food partners

## 🚀 Deployment

### Frontend - Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Set environment variables in Vercel dashboard:
   ```
   VITE_API=https://hangry-5t00.onrender.com
   ```
5. Deploy! Vercel automatically builds and deploys on every push

### Backend - Render Deployment

1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://hangry-alpha.vercel.app
   JWT_SECRET=your_secret
   IMAGEKIT_PUBLIC_KEY=your_key
   IMAGEKIT_PRIVATE_KEY=your_key
   IMAGEKIT_URL_ENDPOINT=your_endpoint
   ```
6. Set build command: `npm install`
7. Set start command: `npm start`
8. Deploy!

## 🔒 Security Considerations

- ✅ Environment variables are properly separated
- ✅ CORS is configured for production domains
- ✅ JWT tokens stored securely in HTTP-only cookies
- ✅ Password hashing with bcryptjs
- ✅ Protected routes with authentication middleware

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [Express.js Documentation](https://expressjs.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [MongoDB Documentation](https://docs.mongodb.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Last Updated:** January 14, 2026
