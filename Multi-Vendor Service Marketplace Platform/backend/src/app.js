const express = require('express')
const authRoutes = require('./routes/auth.routes')
const serviceRoutes=require('./routes/service.routes')
const projectRoutes=require('./routes/project.routes')
const app=express();

app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('./api/service',serviceRoutes)
app.use('./api/service',projectRoutes)

module.exports=app;

