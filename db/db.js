const mongoose = require("mongoose");
console.log("hi bdd")
const URI = "mongodb+srv://deepaknegi:15124117@cluster0.8zw396s.mongodb.net/Pet-Database";
// const URI = "mongodb://localhost:27017/Pet-Database"
const connectDb = async() =>{
    try{
        await mongoose.connect(URI);
        console.log("Connection established with Database");
        console.log("hi bdd")
    } catch(error) {
        console.log(error)
        console.error("Database connection failed");
        process.exit(0);
    }
};

module.exports = connectDb;