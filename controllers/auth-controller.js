const User = require("../models/user");
const doctor = require("../models/doctors");
const bcrypt = require("bcryptjs");



const home = async (req,res)=>{
    try{
        res.status(200).json({message:"Welcome to home page through controllers"});

    }catch(error){

        res.status(400).json({message: "internal server error"})
    }
};

const register = async (req, res)=>{
   try{
    console.log(req.body);
    const{name, email, password, specialised, license } = req.body;

    //user validation
    if(!name || !email || !password){
        return res.status(400).json({msg: " Name, email and password are required"});
    }
    let existingUser = await User.findOne({email});
    if(existingUser){
        // console.log("Email already exists");
        return res.status(400).json({msg: "Email already exists"});
    }
    let existingDoctor = await doctor.findOne({email});
    if(existingDoctor){
        // console.log("Email already exist");
        return res.status(400).json({msg: "Email aready exist"});
    }
    //Checking Doctor registeration
    if(specialised && license){
       const newDoctor = new doctor({name, email, password, specialised, license});
       await newDoctor.save();
       return res.status(200).json({msg: " Doctor registered successfully",
        token: await newDoctor.generateDoctorToken(),
        userId: newDoctor._id.toString(),
       });
    }

    //new user creation
    const newUser = new User({name, email, password});
    await newUser.save();
    return res.status(200).json({msg:"User registered successfully", 
        token: await newUser.generateToken(), 
        userId: newUser._id.toString(),
    });

    // res.status(200).json({message: req.body});

   }catch(error){ 
    res.status(400).json({msg:"Server error during registeration"});
   }
};

const login = async(req,res)=>{ 
    try{
        console.log(req.body); 
        const {email, password} = req.body;
        let userExist = await User.findOne({email});
        // let role = "user";
        console.log(userExist);

        if(!userExist){
            userExist = await doctor.findOne({email});
        }

        if(!userExist){
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if(isPasswordMatch){
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                user:{
                    name: userExist.name,
                    email: userExist.email,
                },
            });
        }
        else{
            res.status(401).json({msg:"Invalid email or password"});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({msg: "Server error during login", error: error.message});
    }
};


module.exports = {home, register, login};