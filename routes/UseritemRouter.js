const express = require('express');
const router = express.Router();
const addWishListController = require('../controller/addWishList');


let multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads') // Here, we use Multer to take a photo and put it in a folder called ‘uploads’
                            // so we can easily access it later. 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
  });
var upload = multer({ storage: storage });


router.post('/',upload.single('file'), addWishListController.handleAddList);



module.exports = router;













// var express = require('express');
// var router = express.Router();

// const userItem = require("../model/Useritem");


// router.getAlluserItem = async (request,response,next)=>{ 
//     const userItem = await userItem.find(); 
//     if(!userItem){
//         response.status(204).json({ "message":"no user items" });
//     };
//     response.json(userItem);
// };


// module.exports = router;
