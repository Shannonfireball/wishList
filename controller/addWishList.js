const WishList = require('../model/WishList');
var fs = require('fs');
var path = require('path');

let multer = require('multer');

const Storage = multer.diskStorage({
    destination:"uploads",
     filename:function (req, file, cb) {
      cb(null, file.fieldname)
    },
  })
const upload = multer({ storage: Storage }).single('testImage');

const handleAddList = async (request,response) => {
    
    const { item_name,brand_name} = request.body;
    if(!item_name || !brand_name){         
        return response.status(400).json({ "message":"item_name and brand_name are needed" })
    }
                  
    // const duplicate = await WishList.findOne({ item_name: item_name }).exec(); 
    // if(duplicate){              
    //     return response.sendStatus(409);
    // }
    try{
        // in mongoose you can create and store at the same time
        // const result = await WishList.create({
        //     "item_name": item_name,
        //     "brand_name":brand_name,
        //     "photo":photo
        // });
        // console.log(result);
        
        // response.status(201).json({ "success":`new list of ${item_name} created`});
        let image = request.body;
        const newList = new WishList({
            "item_name": item_name,
            "brand_name":brand_name,
            "photo":{
                data: fs.readFileSync(path.join(__dirname ,'..', 'uploads', request.file.filename)), // data: image.filename,
                contentType:request.file.mimetype
            }
        })
        console.log(path.join(__dirname ,'..', 'uploads', request.file.filename))
        newList.save().then(()=>response.json({ 'list': newList })).catch(err=>console.log(err))
    }
    catch(error){      
        response.status(500).json({ "message": error.message });
        console.log(request.file)
        

    }
};



module.exports = { handleAddList }