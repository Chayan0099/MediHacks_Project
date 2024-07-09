const {Schema, connect, model} = require('mongoose'); 

connect(''); 

const ptSchema = new Schema({
    name: String,
    ptId: String,
    drName: String, // under which dr the patient is
    doAd: Date, // date of admission
    address: String, 
    age: Number,
    sex: String,
    diagnosis: String
})