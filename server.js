const express =require('express')
const connectDatabase = require('./config/db')
const rbookRoutes = require('./routes/routes')
const app=express()
const PORT = 3000
app.use(express.json())
app.use('/api/books',require('./routes/routes'))
app.get('/',(req,res)=>{
    res.send('Welcome to the Book API')
})
connectDatabase().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })  
}).catch((err)=>{
    console.error('Failed to connect to the database:', err);
    process.exit(1);
})


