# Tourism App Deployment Guide

## CORS Solution Overview

Your tourism app now has a comprehensive CORS solution that works in both development and production environments.

## How It Works

### Development Mode
- Uses direct API calls with multiple CORS proxy fallbacks
- Tries proxies in order: allorigins.win, corsproxy.io, thingproxy.freeboard.io, cors-anywhere.herokuapp.com
- Falls back to next proxy if one fails

### Production Mode (Netlify)
- Uses Netlify Functions to proxy API requests
- Eliminates CORS issues completely
- More reliable and faster than external proxies

## Files Added/Modified

### New Files
- `netlify/functions/api-proxy.js` - Netlify function for API proxying
- `netlify.toml` - Netlify configuration
- `DEPLOYMENT_GUIDE.md` - This guide

### Modified Files
- `src/api/axiosConfig.js` - Enhanced with multiple proxy fallbacks
- `src/api/apiService.js` - Added Netlify function support
- `.env` - Added Netlify function configuration
- `package.json` - Added node-fetch dependency

## Deployment Steps

### 1. Automatic Deployment (Recommended)
Your app is already configured for automatic deployment to Netlify:

1. **Connect to GitHub**: Your repository is already connected
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `build`
   - Functions directory: `netlify/functions`
3. **Environment Variables**: Set in Netlify dashboard:
   - `REACT_APP_BASE_API`: `https://rachelle-magnetohydrodynamic-impetuously.ngrok-free.dev/api/v1`
   - `REACT_APP_IMAGES_URL`: `https://rachelle-magnetohydrodynamic-impetuously.ngrok-free.dev`
   - `REACT_APP_USE_NETLIFY_FUNCTION`: `true`

### 2. Manual Deployment
If you need to deploy manually:

```bash
# Build the project
npm run build

# Deploy to Netlify (if you have Netlify CLI)
netlify deploy --prod --dir=build
```

## Environment Variables

### Required Variables
- `REACT_APP_BASE_API`: Your API base URL
- `REACT_APP_IMAGES_URL`: Your images base URL
- `REACT_APP_USE_NETLIFY_FUNCTION`: Set to `true` for production

### Setting in Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Environment variables
4. Add the variables above

## Testing the Solution

### Local Testing
```bash
npm start
```
- Should work with CORS proxy fallbacks
- Check browser console for proxy attempts

### Production Testing
1. Deploy to Netlify
2. Check browser console for Netlify function usage
3. Verify API calls work without CORS errors

## Troubleshooting

### If CORS Errors Persist
1. **Check Environment Variables**: Ensure all variables are set correctly
2. **Check Netlify Functions**: Verify the function is deployed and working
3. **Check API Server**: Ensure your backend server is running and accessible
4. **Check Console**: Look for specific error messages

### Common Issues
- **403 Forbidden**: CORS proxy service is down (should fallback to next proxy)
- **Netlify Function Error**: Check function logs in Netlify dashboard
- **API Server Down**: Check if your ngrok tunnel is still active

## Monitoring

### Development
- Check browser console for proxy attempts
- Monitor network tab for successful requests

### Production
- Check Netlify function logs
- Monitor API response times
- Check for any error patterns

## Backend Server Configuration (Optional)

For the best performance, configure your backend server with CORS headers:

```javascript
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

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Check Netlify function logs
3. Verify your API server is running
4. Check environment variables are set correctly

The solution is designed to be robust with multiple fallbacks, so it should work even if some components fail.
