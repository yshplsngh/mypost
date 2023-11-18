const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    //if you don't use exec() its fine.by using this  but you get a better stack trace if any error happened
    const foundUser = await User.findOne({ email }).exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized // user not found in db' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized // wrong password' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing email
    res.json({ accessToken })
}


// @desc signup
// @route POST /auth/signup
// @access public

const signup = async (req,res)=>{
    const {name,password,email,phoneNumber,city,address,postalCost} = req.body;
    
    if(!name || !password || !email || !phoneNumber || !city || !address || !postalCost){
        return res.status(400).json({message:"all field are required"})
    }


    const foundEmail = await User.findOne({email}).lean().exec();
    if(foundEmail){
        return res.status(409).json({message:'duplicate email'})
    }
    
    const foundPhoneNumber = await User.findOne({phoneNumber}).lean().exec();
    if(foundPhoneNumber){
        return res.status(409).json({message:'duplicate phone number'})
    }

    

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10)

    const userObject = {name,email,password:hashedPassword,phoneNumber,city,address,postalCost}

    const user = await User.create(userObject)


    if(user){
        res.status(201).json({message:`${user.name} created with ${user.email}`})
    } else{
        res.status(400).json({message:'invalid user data received'})
    }
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized \\ refresh jwt not found' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: decoded.email }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout,
    signup
}