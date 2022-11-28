const WishList = require('../model/WishList');





const handleGetAllList = async (request,response) => {
    try{
        // in mongoose you can create and store at the same time
        const result = await WishList.find().exec();
        console.log(result);
        
        response.status(201).json(result);
        
    }
    catch(error){      
        response.status(500).json({ "message": error.message });

    }
};



module.exports = { handleGetAllList }