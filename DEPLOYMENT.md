# 🚀 Deployment Checklist

## Before Publishing to GitHub

### Code Quality
- [ ] Remove all `console.log()` statements (or keep only important ones)
- [ ] Remove debugger statements
- [ ] Check for any commented-out code
- [ ] Verify no hardcoded credentials in code
- [ ] Lint check: `npm run lint` passes

### Environment Configuration
- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` files are created with placeholder values
- [ ] `.env.production` created with production API URL
- [ ] All environment variables are documented

### Frontend Checklist
- [ ] `npm run build` succeeds without errors
- [ ] No TypeScript/ESLint errors
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] All API calls use `VITE_API` environment variable
- [ ] No hardcoded localhost URLs
- [ ] Images are optimized
- [ ] Meta tags updated in index.html

### Backend Checklist
- [ ] `npm install` succeeds
- [ ] CORS configuration includes all deployment domains
- [ ] Error handling is comprehensive
- [ ] Database connection string uses environment variable
- [ ] JWT secret uses environment variable
- [ ] No hardcoded API keys
- [ ] API routes are properly secured with middleware

### Git Setup
- [ ] Initialize repository: `git init`
- [ ] Add all files: `git add .`
- [ ] Create meaningful initial commit: `git commit -m "Initial commit: Hangry food discovery platform"`
- [ ] Push to GitHub: `git push -u origin main`

## Vercel Frontend Deployment (hangry-alpha.vercel.app)

1. **Connect GitHub Repository**
   - Go to vercel.com
   - Sign in/Sign up with GitHub
   - Click "New Project"
   - Select your Hangry repository
   - Choose "Frontend" as root directory

2. **Configure Build Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   ```
   VITE_API=https://hangry-5t00.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Verify deployment at hangry-alpha.vercel.app

## Render Backend Deployment (hangry-5t00.onrender.com)

1. **Connect GitHub Repository**
   - Go to render.com
   - Sign in/Sign up with GitHub
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repo

2. **Configure Service**
   - Name: `hangry-backend`
   - Region: Choose closest to you
   - Branch: `main`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Choose appropriate tier

3. **Set Environment Variables**
   ```
   MONGODB_URI=<your_mongodb_atlas_connection_string>
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://hangry-alpha.vercel.app
   JWT_SECRET=<generate_strong_random_string>
   IMAGEKIT_PUBLIC_KEY=<your_key>
   IMAGEKIT_PRIVATE_KEY=<your_key>
   IMAGEKIT_URL_ENDPOINT=<your_endpoint>
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build and deployment
   - Verify at hangry-5t00.onrender.com

## Post-Deployment Verification

### Frontend
- [ ] Site loads without errors
- [ ] Navigation works
- [ ] API calls succeed (check Network tab)
- [ ] Login/Register works
- [ ] Food discovery loads data
- [ ] Mobile responsive

### Backend
- [ ] Health check: `curl https://hangry-5t00.onrender.com/`
- [ ] Authentication endpoints accessible
- [ ] Database queries working
- [ ] CORS headers present
- [ ] Error responses are meaningful

### Monitoring
- [ ] Set up error tracking (Sentry optional)
- [ ] Monitor API response times
- [ ] Check deployment logs for warnings
- [ ] Test critical user flows

## Continuous Deployment

Once deployed, your sites will auto-update on every GitHub push:

### For Frontend
1. Make changes locally
2. Commit: `git commit -m "feature: description"`
3. Push: `git push origin main`
4. Vercel automatically builds and deploys

### For Backend
1. Make changes locally
2. Commit: `git commit -m "fix: description"`
3. Push: `git push origin main`
4. Render automatically builds and deploys

## Troubleshooting

### Vercel Issues
- **Build fails**: Check `vite.config.js` and `vercel.json`
- **API calls fail**: Verify `VITE_API` environment variable
- **CORS errors**: Check backend CORS configuration
- **Images not loading**: Check image paths in components

### Render Issues
- **Build fails**: Check `package.json` and dependencies
- **App crashes**: Check logs in Render dashboard
- **Database connection fails**: Verify MONGODB_URI
- **API endpoints fail**: Check route definitions

### General
- Clear browser cache: Ctrl+Shift+Delete
- Check network tab for actual errors
- Review deployment logs on platforms
- Test with fresh incognito window

## Performance Optimization

- [ ] Frontend build size is reasonable (< 1MB gzipped)
- [ ] Backend responses are fast (< 500ms)
- [ ] Images are optimized
- [ ] API pagination implemented for large datasets
- [ ] Database indexes created

## Security Checklist

- [ ] No credentials in code or .env files
- [ ] HTTPS enforced (automatic on Vercel/Render)
- [ ] CORS properly configured
- [ ] JWT secrets are strong and unique
- [ ] Input validation on all endpoints
- [ ] Rate limiting considered
- [ ] SQL injection prevention (using MongoDB/Mongoose)

## Helpful Commands

```bash
# Check build size
cd Frontend && npm run build && du -sh dist

# Test API locally
curl -X GET http://localhost:3000/

# Check environment
printenv | grep VITE_API

# View deployment logs
# Vercel: Dashboard > Project > Deployments > Logs
# Render: Dashboard > Service > Logs
```

---

**Deployment Status:**
- Frontend: Ready for Vercel ✅
- Backend: Ready for Render ✅
- GitHub: Ready for push ✅
