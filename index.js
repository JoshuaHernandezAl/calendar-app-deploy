const express = require('express');
const { dbConnection } = require('./config/db.config');
const cors= require('cors');
require('dotenv').config();
const app =express();

dbConnection();

app.use(cors());

app.use(express.static('public')); 

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/events',require('./routes/events.routes'));

const port= process.env.PORT || 4000;
app.listen(port,()=> {
    console.log('Servidor en el puerto ', port);
});