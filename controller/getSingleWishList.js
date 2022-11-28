const WishList = require('../model/WishList');





const handleGetList = async (request,response) => {
    try{
        if(!request?.body?.id){
            return response.status(400).json({ "message":"id required " });
        }
        // in mongoose you can create and store at the same time
        const result = await WishList.findOne({ _id:request.body.id }).exec();
        console.log(result);
        
        response.status(201).json(result);
        
    }
    catch(error){      
        response.status(500).json({ "message": error.message });

    }
};



module.exports = { handleGetList }