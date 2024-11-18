const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },

   email:{
    type: String,
    required: true,
   },

   password:{
    type: String,
    required: true,
   },

   specialised:{
    type: String,
    required: true,
   },

   license:{
    type: String,
    required: true,
   },


});

//secure password
   doctorSchema.pre('save', async function(){
   console.log("pre method", this);
   const Doctor = this;
  
   if(!Doctor.isModified('password')){
      next();
   }
   try{
      const saltRound = 10;
      const hash_password = await bcrypt.hash(Doctor.password, saltRound);
      Doctor.password = hash_password;
   }catch(error){
      next(error);
   }
  });

//   doctorSchema.methods.comparePassword = async function(){
//    return await bcrypt.compare(password, this.password);
//   };

//jsonwebtoken
  doctorSchema.methods.generateToken = async function () {
   try{
     return jwt.sign({
       userId: this._id.toString(),
       email: this.email,
     },
     process.env.JWT_SECRET_KEY, 
     {
       expiresIn: "30d",
     }
   );
   }catch(error){
       console.log(error);
   }
};


const doctor = new mongoose.model("Doctors", doctorSchema);

module.exports = doctor;