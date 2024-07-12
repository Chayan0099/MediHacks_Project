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

const sinlgeVitalsSchema = new Schema ({
    doAs: Date, // date of assesment, on which date vitals signs are uploaded   
    heartRate: Number,
    spO2: Number,//saturation of oxygen in blood, unit - %
    rr: Number, //respiratory rate 
    bp_sys: Number, //systolic blood pressure
    bp_di: Number, //diastolic blood presssure
    cbg: Number, //glucose level of blood, unit - mg/dL
    gcs_eye: Number, // glasgow coma scale for eye response, range 1-3
    gcs_verbal: Number, // for verbal respone , range 1-4
    gcs_motor: Number, // for motor response, range 1-5
    inotropicDrugs: Object({
        name: String, 
        dose: Number
    }), // drugs for the proper function of the heart, usually very high alert medication
    urineInput: Number,
    urineOutput: Number
}) 

const vitalSchema = new Schema({
    ptId: String, 
    vitals: [sinlgeVitalsSchema]
})

const adminSchema = new Schema({
    email: String,
    userName: String,
    password: String
})

const wardSchema = new Schema({
    location: String,
    hospitalName: String,
    wardName: String,
    password: String
})

const Patient = new model('Patient', ptSchema); 
const Vitals = new model('Vitals', vitalSchema); 
const Admin = new model('Admin', adminSchema);
const Ward = new model('Ward', wardSchema)

module.exports = { Patient, Vitals, Admin, Ward }; 