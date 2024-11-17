const express = require('express')
const app = express()
const mongoose = require('mongoose')
const contactsRoutes = require('./routes/contacts')
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/contacts')
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use('/contacts',contactsRoutes)

app.listen(3000,()=>{
    console.log("listening on port 3000")
})

