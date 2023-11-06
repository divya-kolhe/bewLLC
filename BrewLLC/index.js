const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route')

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Learning API");
})

// connect to dB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true}
).then(()=>{
    console.log("Db Connected");
}).catch((e)=>{
    console.log("Error",e);
});

app.use(bookRoute);
app.use(authRoute);

app.listen(process.env.PORT,process.env.HOST, function () {
    console.log("Server is listening on 3000");
})
