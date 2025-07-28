# 🚀 Twigane Backend Deployment Guide

## 📋 Prerequisites

- [x] GitHub account
- [x] Render account (free at render.com)
- [x] Your code pushed to GitHub repository

## 🎯 Option 1: Deploy to Render (Recommended)

### **Step 1: Push Your Code to GitHub**

```bash
# If not already done
git add .
git commit -m "Prepare backend for deployment"
git push origin main
```

### **Step 2: Deploy on Render**

1. **Go to [render.com](https://render.com)** and sign up/sign in
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `twigane-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --timeout 300`
   - **Plan**: Start with `Free` (can upgrade later)

### **Step 3: Add Environment Variables**

In Render dashboard, go to **Environment** and add:

```
FLASK_ENV=production
PYTHON_VERSION=3.11.0
```

### **Step 4: Add Persistent Disk (For Models)**

1. In your service settings, go to **Disks**
2. **Add Disk**:
   - **Name**: `models-disk`
   - **Mount Path**: `/opt/render/project/src/models`
   - **Size**: `2 GB` (free tier allows up to 1GB, paid plans allow more)

### **Step 5: Deploy**

1. **Click "Create Web Service"**
2. **Wait for build** (5-10 minutes for ML models to install)
3. **Check logs** for any errors
4. **Test your API** at `https://your-app-name.onrender.com/health`

## 🔧 Update Frontend Configuration

Once deployed, update your frontend to use the new backend URL:

### **Update Frontend Environment Variables**

Create/update `frontend/.env`:

```env
# Your existing Firebase config...
REACT_APP_FIREBASE_API_KEY=your-key
REACT_APP_FIREBASE_AUTH_DOMAIN=twigane-78a8b.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=twigane-78a8b
REACT_APP_FIREBASE_STORAGE_BUCKET=twigane-78a8b.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=470563691020
REACT_APP_FIREBASE_APP_ID=1:470563691020:web:8e314113ac05d07c8bec29

# New backend URL
REACT_APP_API_URL=https://your-app-name.onrender.com
```

### **Deploy Frontend to Netlify**

1. **Build your frontend**: `npm run build` in the frontend directory
2. **Drag & drop** the `build` folder to [netlify.com](https://netlify.com)
3. **Or connect GitHub** for auto-deployment

## 🧪 Testing Your Deployment

### **Test Backend Endpoints:**

```bash
# Health check
curl https://your-app-name.onrender.com/health

# Chat test
curl -X POST https://your-app-name.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Hello", "user_email": "test@example.com"}'
```

### **Test Frontend:**

1. **Open your deployed frontend**
2. **Sign in** with your user account
3. **Try chat, quiz, translation** features
4. **Check admin dashboard** (if you're the admin)

## 🎯 Alternative Deployment Options

### **Option 2: Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Connect GitHub repository**
3. **Railway auto-detects** Python and deploys
4. **Add environment variables** in Railway dashboard

### **Option 3: Google Cloud Run**

```bash
# Build Docker image
docker build -t twigane-backend .

# Deploy to Cloud Run
gcloud run deploy twigane-backend \
  --image gcr.io/PROJECT-ID/twigane-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔄 Continuous Deployment

### **Auto-Deploy from GitHub:**

1. **Render/Railway**: Automatically redeploys on git push
2. **Netlify**: Automatically redeploys frontend on git push
3. **Set up branch protection** for production deployments

## 📊 Monitoring & Scaling

### **Free Tier Limitations:**

- **Render Free**: 750 hours/month, sleeps after 15 min inactivity
- **Railway Free**: $5 credit monthly
- **Netlify Free**: 100GB bandwidth/month

### **Upgrade When Needed:**

- **More traffic**: Upgrade to paid plans
- **Always-on**: Paid plans don't sleep
- **More storage**: For larger ML models

## 🛡️ Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS Configuration**: Update for your frontend domain
3. **Rate Limiting**: Add for production traffic
4. **HTTPS**: Always use HTTPS in production

## 🚨 Troubleshooting

### **Common Issues:**

1. **Build Timeout**: Increase timeout in deployment settings
2. **Memory Issues**: Use fewer workers in gunicorn
3. **Model Loading**: Use persistent disk for model storage
4. **Cold Starts**: Consider paid plan to avoid sleeping

### **Logs & Debugging:**

- **Render**: Check logs in dashboard
- **Railway**: View logs in deployment tab
- **Frontend**: Check browser console for API errors

Your backend will be live at: `https://your-app-name.onrender.com` 🎉 