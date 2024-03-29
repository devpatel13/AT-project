const express = require('express');
const app = express()

const dbConnect = require('./dbConnect')

app.use(express.json())
const itemsRoute = require('./routes/itemsRoute')
const usersRoute = require('./routes/userRoute')
const billsRoute = require('./routes/billsRoute')


app.use('/api/items' , itemsRoute);
app.use('/api/users' , usersRoute);
app.use('/api/bills' , billsRoute);

const port = process.env.PORT || 5000;

app.get('/' , (req,res)=>res.send("Hello world!"))
app.listen(port , () => console.log('Node JS server at running at port : '+port+'!'))
