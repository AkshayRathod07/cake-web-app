require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const Emitter = require('events')

// MongoDbStore(session)

// const url = 'mongodb://localhost/cake'

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

// mongodb connection

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected..");
  })
  .catch((err) => {
    console.log("connection failed..");
  });

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter)


 // session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_URL,
    }),

    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
); 

//   passport config
const passportInit = require('./app/config/passport');
const { Socket } = require("dgram");
passportInit(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//  telling express data types
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
  
// assets
app.use(express.static("public"));



// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// set template engine
app.use(expressLayout);

app.set("views", path.join(__dirname, "resources/views"));

app.set("view engine", "ejs");

// route
require("./routes/web")(app);

const server = app.listen(PORT, () => {
  console.log(`server is started successfully on ports ${PORT}`);
});

const io = require('socket.io')(server)


io.on('connection',(socket)=>{
  // join
  // console.log(socket.id);
  socket.on('join',(roomName)=>{
    // console.log(roomName);
    socket.join(roomName)
  })
})

eventEmitter.on('orderUpdated',(data)=>{
  io.to(`order_${data.id}`).emit('orderUpdated',data)
})

eventEmitter.on('orderPlaced',(data)=>{
  io.to('adminRoom').emit('orderPlaced',data)
})