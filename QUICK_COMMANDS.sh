#!/bin/bash
# Quick Deployment Commands for Hangry

# =====================================================
# GitHub Setup
# =====================================================

echo "Setting up GitHub repository..."
git init
git add .
git commit -m "Initial commit: Hangry food discovery platform"
git branch -M main
# git remote add origin https://github.com/YOUR_USERNAME/Hangry.git
# git push -u origin main

# =====================================================
# Local Development
# =====================================================

# Start Backend Development Server
echo "Starting backend..."
cd Backend
npm install
npm run dev
# Backend runs on http://localhost:3000

# Start Frontend Development Server (in new terminal)
echo "Starting frontend..."
cd Frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173

# =====================================================
# Production Build
# =====================================================

# Build Frontend
echo "Building frontend..."
cd Frontend
npm run build
# Output in: Frontend/dist/

# Test Production Build
npm run preview
# Preview on http://localhost:4173

# =====================================================
# Environment Variables Setup
# =====================================================

# Backend - Create .env file
cat > Backend/.env << EOF
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://hangry-alpha.vercel.app
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
EOF

# Frontend - Create .env.production file
cat > Frontend/.env.production << EOF
VITE_API=https://hangry-5t00.onrender.com
EOF

# =====================================================
# Deployment Verification
# =====================================================

# Test Frontend
echo "Testing frontend build..."
cd Frontend && npm run build && echo "✅ Frontend build successful"

# Test Backend
echo "Testing backend..."
cd Backend && node -c server.js && echo "✅ Backend syntax valid"

# =====================================================
# Useful URLs
# =====================================================

# GitHub: https://github.com/YOUR_USERNAME/Hangry
# Frontend: https://hangry-alpha.vercel.app
# Backend: https://hangry-5t00.onrender.com
# Vercel: https://vercel.com/dashboard
# Render: https://dashboard.render.com

# =====================================================
# After Deployment Testing
# =====================================================

# Test API Health
curl https://hangry-5t00.onrender.com/

# Test Frontend Load
curl -I https://hangry-alpha.vercel.app/

# =====================================================
# Debugging
# =====================================================

# Check which Node version
node --version

# Check npm version
npm --version

# Check git status
git status

# View recent commits
git log --oneline -5

# Check file sizes
du -sh Frontend/dist/
du -sh Backend/

# =====================================================
# Useful Node Commands
# =====================================================

# Generate random JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Check if port is in use
lsof -i :3000  # Backend
lsof -i :5173  # Frontend

# =====================================================
# Git Commands
# =====================================================

# Push to GitHub
git push origin main

# Check deployment status
git log --oneline -5

# Update submodule (if applicable)
git submodule update --remote

# =====================================================
# Performance Checks
# =====================================================

# Frontend bundle analysis
cd Frontend && npm run build -- --stats

# Check dependencies security
npm audit

# Update dependencies
npm update

# =====================================================
# Cleanup
# =====================================================

# Remove node_modules (for clean install)
rm -rf node_modules
rm package-lock.json

# Clean build artifacts
rm -rf dist/
rm -rf build/

# =====================================================
# Docker Commands (Optional)
# =====================================================

# Build Docker image for backend
docker build -t hangry-backend Backend/

# Run Docker container
docker run -p 3000:3000 --env-file Backend/.env hangry-backend

# =====================================================
# End of Quick Commands
# =====================================================

echo "✅ All setup commands ready!"
echo ""
echo "Next steps:"
echo "1. Configure .env files with actual values"
echo "2. Push to GitHub: git push origin main"
echo "3. Deploy Frontend to Vercel"
echo "4. Deploy Backend to Render"
echo ""
echo "Frontend URL: https://hangry-alpha.vercel.app"
echo "Backend URL: https://hangry-5t00.onrender.com"
