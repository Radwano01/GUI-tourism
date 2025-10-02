# CORS Error Solution Guide

## Problem
You're experiencing CORS (Cross-Origin Resource Sharing) errors when your React app deployed on Netlify tries to access your API running on ngrok.

## Error Details
```
Access to XMLHttpRequest at 'https://rachelle-magnetohydrodynamic-impetuously.ngrok-free.dev/api/v1/public/countries' 
from origin 'https://tourism-radwan.netlify.app' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solutions Implemented

### 1. Environment Configuration
- Created `.env` file with proper API URLs
- Set up environment variables for API base URL and images URL

### 2. Enhanced Axios Configuration
- Updated `src/api/axiosConfig.js` with:
  - Proper CORS headers
  - ngrok-skip-browser-warning header
  - CORS proxy fallback mechanism
  - Better error handling

### 3. API Service Layer
- Created `src/api/apiService.js` for centralized API management
- Implemented automatic CORS proxy fallback
- Added proper error handling and logging

### 4. Development Proxy
- Added `src/setupProxy.js` for local development
- Installed `http-proxy-middleware` for development server

## Backend Server Configuration (Required)

To completely resolve CORS issues, your backend server needs to include these headers:

```javascript
// Add these headers to your backend API responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, ngrok-skip-browser-warning');
  res.header('ngrok-skip-browser-warning', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

## Alternative Solutions

### 1. CORS Proxy Services
- Use services like `cors-anywhere.herokuapp.com` (already implemented as fallback)
- Consider using `allorigins.win` or `api.allorigins.win`

### 2. Netlify Functions
- Create serverless functions on Netlify to proxy API requests
- This eliminates CORS issues entirely

### 3. Backend CORS Configuration
- Configure your backend server to allow your Netlify domain
- Add specific origin instead of wildcard for better security

## Testing the Solution

1. **Local Development:**
   ```bash
   npm start
   ```
   The proxy should handle CORS automatically.

2. **Production (Netlify):**
   - The app will try direct API calls first
   - If CORS fails, it will automatically fallback to CORS proxy
   - Check browser console for detailed error messages

## Monitoring

- Check browser console for API errors
- Monitor network tab for failed requests
- Look for CORS proxy fallback messages in console

## Next Steps

1. **Immediate:** Test the current implementation
2. **Short-term:** Configure your backend server with proper CORS headers
3. **Long-term:** Consider using Netlify Functions for better performance and security

## Files Modified

- `.env` - Environment configuration
- `src/api/axiosConfig.js` - Enhanced axios configuration
- `src/api/apiService.js` - New API service layer
- `src/setupProxy.js` - Development proxy configuration
- `src/pages/hero/HeroPage.jsx` - Updated to use new API service
- `package.json` - Added http-proxy-middleware dependency
