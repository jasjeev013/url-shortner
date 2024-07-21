const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const {chechForAuthentication,restrictTo} = require('./middlewares/auth')
const {connectToMongoDB} = require('./db')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(chechForAuthentication);

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log("Connected to MongoDB");
})


const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/users')


app.use('/url',restrictTo(['NORMAL']),urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute)

app.listen(port,() => {
    console.log('Server started at port ',port);
})

