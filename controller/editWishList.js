const WishList = require('../model/WishList');
var fs = require('fs');
var path = require('path');

const handleEditWishList = async (request,response)=>{
    try{
    let image = request.body;
    
    if(!request?.body?.id){
        return response.status(400).json({ "message":"id required " });
    }

    const wishList = await WishList.findOne({ _id:request.body.id }).exec();
    
    if(!wishList){
        return response.status(201).json({ "message":`no wish list matchs ${request.body.id} id` });
    }

    if(request.body?.item_name){
        wishList.item_name = request.body.item_name;
    }
    if(request.body?.brand_name){
        wishList.brand_name = request.body.brand_name;
    }
    if(request?.file){
        wishList.photo.data = fs.readFileSync(path.join(__dirname ,'..', 'uploads', request.file.filename)) 
        console.log(path.join(__dirname ,'..', 'uploads', request.file.filename))           
        wishList.photo.contentType = request.file.mimetype;
    }
    
    const result = await wishList.save();
    response.json(result);
    }catch(error){      
        response.status(500).json({ "message": error.message });
        console.log(request.body.id)

    }
};



module.exports = { handleEditWishList }