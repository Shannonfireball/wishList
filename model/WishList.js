const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListSchema = new Schema({
    item_name: { 
        type: String
     },
     brand_name:{ 
        type: String
     },
    photo:{ 
        data: Buffer,
        contentType:String
     }, 
});

                         // creating a model
                                 // mongoose will set Employee to lowercase and plural
module.exports = mongoose.model('Wishlist', ListSchema);