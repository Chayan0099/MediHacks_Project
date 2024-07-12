const express = require('express'); 
const router = express.Router(); 
const { Admin, Ward } = require('../db'); 
const z = require('zod'); 
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = require('./config'); 

router.use(express.json()); 

router.post('/signup', async (req, res) => {
    const adminSchema = z.object({
        email: z.string().email(),
        userName: z.string(), 
        password: z.string()
    })

    const parsed = adminSchema.safeParse(req.body); 

    if(!parsed.success){
        return res.status(403).json({
            msg: "Invalid input"
        })
    }

    const existingUser = await Admin.findOne({ 
        email: req.body.email 
    })

    if(existingUser) {
        return res.status(403).json({
            msg: "user already exists"
        }) 
    }
    
    const user = await Admin.create({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password
    })
     
    const token = jwt.sign({id:user._id}, JWT_SECRET); 

    return res.json({
        token: token, 
        msg:"user created successfully"
    })
}) 

router.post('/signin', async (req, res) => {
    const signinSchema = z.object({
        userName: z.string(), 
        password: z.string()
    })

    const parsed = signinSchema.safeParse(req.body); 

    if(!parsed.success) {
        return res.status(403).json({
            msg:"Invalid Input"
        })
    }

    const user = await Admin.findOne({
        userName: req.body.userName, 
        password: req.body.password
    })

    if(!user){
        return res.status(403).json({
            msg:"User does not exist"
        })                                                
    }

    const token = jwt.sign({id:user._id}, JWT_SECRET); 

    return res.json({
        token: token
    })
})

router.post('/createward', async (req, res) => {
    const wardSchema = z.object({
        location: z.string(), 
        hospitalName: z.string(),
        wardName: z.string(), 
        password: z.string()
    })

    const parsed = wardSchema.safeParse(req.body); 

    if(!parsed.success){
        return res.status(403).json({
            msg:"invalid input"
        })
    }

    const existingWard = await Ward.findOne({
        wardName: req.body.wardName
    })

    if(existingWard){
        return res.json({
            msg:"ward already exists"
        })
    }

    const ward = await Ward.create({
        location: req.body.location, 
        hospitalName: req.body.hospitalName,
        wardName: req.body.wardName,
        password: req.body.password
    })

    
})

