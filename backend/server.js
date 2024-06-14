
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const cors=require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors);

const authServiceUrl = 'http://localhost:4000';
const projectServiceUrl = 'http://localhost:4002';
const proposalServiceUrl = 'http://localhost:4001';
const userServiceUrl = 'http://localhost:4000';

app.use('/api/auth', createProxyMiddleware({
     target: authServiceUrl,
     changeOrigin: true,
     logLevel: 'debug' }));
app.use('/api/projects', createProxyMiddleware({ 
    target: projectServiceUrl,
     changeOrigin: true,
     logLevel: 'debug' }));
app.use('/api/proposals', createProxyMiddleware({ 
    target: proposalServiceUrl,
     changeOrigin: true,
     logLevel: 'debug',
     pathRewrite: {
        '^/api/proposals': ''
      },
     onError: function onError(err, req, res) {
        console.error('Something went wrong with the proxy middleware', err);
        res.end();}}));
app.use('/api/user', createProxyMiddleware({ 
    target: userServiceUrl,
     changeOrigin: true,
     logLevel: 'debug' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
