require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/auth-router");
const connectDb = require("./db/db");


const corsOptions ={
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
};

//handling cors
app.use(cors(corsOptions));

//middleware-responsible for parsing json data from requests
app.use(express.json());

//Mounting
app.use("/api/auth", router);


//routes
// app.get("/", (req, res)=>{
//     res.status(200).send("Welcome to home page");

// });

// app.get("/register", (req, res)=>{
//     res.status(200).send("Welcome to our registeration");
// });

const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`server is running at port: ${PORT}`);
  });
});
