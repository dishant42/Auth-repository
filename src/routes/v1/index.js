const express=require("express");
const usercontroller=require("../../controllers/user-controller");

const router=express.Router();

router.post("/signup",usercontroller.create);
router.post("/signIN",usercontroller.signIN);

module.exports=router;