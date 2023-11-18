const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc get all user
// @route GET /user
// @access private

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find().select('-password').lean()
})