const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')
// const verifyJWT = require('../middleware/verifyJWT')


// router.use(verifyJWT)
router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/signup')
    .post(authController.signup)

module.exports = router