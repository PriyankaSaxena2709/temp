const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");


router.route("/").get(authControllers.home);
router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

//First way
// router.get("/", (req,res)=>{
//    res.status(200).send("Welcome to the home page through router");
// });


//second way
// router.route("/register").get((req,res)=>{
//     res.status(200).send("Welcome to register page through router");
//  });

module.exports = router;