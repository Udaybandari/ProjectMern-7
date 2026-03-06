const express=require("express");
const{adminOnly,protect}=require("../middlewares/authMiddleware");
const { getAdmins,deleteAdmin } = require("../controllers/adminController");
const router=express.Router();


//User Management Routes

router.get("/",protect,adminOnly,getAdmins);
router.delete("/:id", protect, adminOnly, deleteAdmin);


module.exports=router;