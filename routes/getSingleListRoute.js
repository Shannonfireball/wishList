const express = require('express');
const router = express.Router();
const getWishListController = require('../controller/getSingleWishList');

router.get('/', getWishListController.handleGetList);



module.exports = router;