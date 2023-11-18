const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')


// verifyJWT()

// router.route('/')
//     .get(userController.getAllUsers)

module.exports = router
