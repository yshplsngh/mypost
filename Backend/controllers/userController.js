const User = require('../models/User')


// @desc get all user
// @route GET /user
// @access private

const getAllUsers = async(req,res)=>{
    const users = await User.find().select('-password').lean()
}