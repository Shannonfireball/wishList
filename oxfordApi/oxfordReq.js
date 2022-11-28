const axios = require('axios');
require('dotenv').config();

//app id for oxford
const app_id = process.env.OXFORD_APP_ID;
//app key for oxford api
const app_key = process.env.OXFORD_APP_KEY;

const oxfordReq = async (word)=>{
    const axiosOptions = {
        method:'GET',
        headers:{ 'content-type': 'application/json',app_id,app_key },
        url:`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?fields=definitions,etymologies,examples&strictMatch=true`
    };

    let result = {}
    try{
        const {data} = await axios(axiosOptions);

        result.word = data.word;
        result.entries = [];
        data.results[0].lexicalEntries.forEach(entry => {
            result.entries.push({
                partOfSpeech: entry.lexicalCategory.text,
                origin: entry.entries[0].etymologies,
                definitions: entry.entries[0].senses[0].definitions,
                examples: entry.entries[0].senses[0].examples.map(example => example.text)
            })})
        
        return result;    

    }catch(error){
        console.log(error);
    }
}



module.exports = { oxfordReq}