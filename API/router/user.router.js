const express = require('express')
const {userSignup, userLogin, verifyToken} = require('../controller/user.controller')

const router = express.Router()

router.post('/signup', userSignup)
router.post('/login', userLogin)

module.exports = router