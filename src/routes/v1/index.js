const express=require("express");
const usercontroller=require("../../controllers/user-controller");
const {validateUserAuth}=require("../../middlewares/content-validation")

const router=express.Router();

router.post("/signup",usercontroller.create);
router.post("/signIN",validateUserAuth,usercontroller.signIN);
router.get('/isAuthenticated',usercontroller.isAuthenticated);

module.exports=router;