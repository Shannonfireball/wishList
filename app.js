var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var app = express();



require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
// connect to db
connectDB();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
// app.use('/useritems',require('./routes/UseritemRouter'));
app.use('/addlist',require('./routes/UseritemRouter'));
app.use('/getallwishlist',require('./routes/getUserItemRouter'));
app.use('/getwishlist',require('./routes/getSingleListRoute'));
app.use('/editwishlist',require('./routes/editWishListRoute'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.all('*',(request,response) => {

    response.status(404);
    if(request.accepts('html')){
        response.sendFile(path.join(__dirname,'views','404.html'));
    } else if(request.accepts('json')){
        response.json( {error:"404 not found"});
    } else {
        response.type('txt').send('404 not found');
    }

});



mongoose.connection.once('open',() => {
    console.log('connected to mongoDB');
        
});



module.exports = app;




// let multer = require('multer');

// const Storage = multer.diskStorage({
//     destination:"uploads",
//      filename:function (req, file, cb) {
//       cb(null, file.originalname)
//     },
//   })
// const upload = multer({ storage: Storage }).single('testImage');

// app.post('/uploads',(req,res)=>{
//     upload(req,res,(err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             const newImage = new ImageModel({
//                 name:req.body.name,
//                 image:{
//                     data:req.file.filename,
//                     contentType:'image/png'
//                 }
//             })
//             newImage.save().then(()=>res.send('success upload')).catch(err=>console.log(err))
//         }
//     })
// })
