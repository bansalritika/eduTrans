const userModel = require('../model/user.model')
const bcrypt = require('bcrypt')


const userSignup = async(req, res) => {
    const data = req.body

    const name = data.name
    const email = data.email
    const password = data.password
    const confirmpass = data.confirmpass

    if( !name || !email || !password || !confirmpass){
        res.status(400).json({
            message: 'please enter field data'
        })
        return
    }else if (password !== confirmpass){
        res.status(400).json({
            message: 'passwords do not match, please try again'
        })
    }

    const hashedPass = await bcrypt.hash(password, 8)

    const existingUser = await userModel.findOne({
        email: email
    })

    if(!existingUser){
        const newUser = new userModel({
            email,
            name,
            // userrole: userrole,
            password: hashedPass
        })
        //saving new user
        try{
            await newUser.save()
            res.status(200).json({
                message: 'User successfully signed in'
            })
            return
        }catch(err){
            res.status(500).json({
                error: err.stack,
                message: 'Error saving new user'
            })
            return
        }
    }else{
        res.status(400).json({
            message: 'email already registered'
        })
    }
}



const userLogin = async(req, res) => {
    const data = req.body

    const email = data.email
    const password = data.password
    if(!email || !password){
        res.status(401).json({
            message: 'Please enter email and password'
        })
        return
    }

    try{
        const existingUser = await userModel.findOne({
            email: email
        })
    
        if(!existingUser){
            res.status(400).json({
                message: 'Email not registered, please signup'
            })
            return
        }
    
        const passwordMatch = await bcrypt.compare(password, existingUser.password)
    
        if(!passwordMatch){
            res.status(401).json({
                message: 'Authentication failed'
            })
            return
        }
    
        const token = jwt.sign({user: existingUser}, 'authsystem', {expiresIn: '1h'})
        res.status(200).json({
            token, 
            message: 'Successfully logged in '
        })
    }catch(err){
        res.status(500).json({
            message: 'Login failed',
            error: err.stack
        })
    }
    
}

// verify token
var decoded
function verifyToken(req, res, next){
    const token = req.header('Authorization')

    if(!token){
        res.status(401).json({
            message: 'Access denied, please signup or login'
        })
        return
    }

    try{
        decoded = jwt.verify(token, 'authsystem')
        console.log('Authorized', decoded)
        next();
    }catch(err){
        res.status(401).json({
            error:'invalid token',
            err
        })
        return
    } 
}

module.exports = {userLogin, userSignup, verifyToken}