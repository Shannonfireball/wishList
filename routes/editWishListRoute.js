const express = require('express');
const router = express.Router();
const editWishListController = require('../controller/editWishList');


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


router.put('/',upload.single('file'), editWishListController.handleEditWishList);



module.exports = router;