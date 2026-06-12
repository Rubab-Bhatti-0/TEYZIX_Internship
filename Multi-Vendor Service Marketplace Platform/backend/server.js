const connectdb=require ('./src/db/db');
const app=require('./src/app');
require('dotenv').config();
const PORT=process.env.PORT||3000;
connectdb()

app.listen(PORT,()=>{
    console.log("server is listeing on port ", PORT)
})