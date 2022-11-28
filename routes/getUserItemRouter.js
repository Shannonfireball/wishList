const express = require('express');
const router = express.Router();
const getAllWishListController = require('../controller/getAllWishList');

router.get('/', getAllWishListController.handleGetAllList);



module.exports = router;