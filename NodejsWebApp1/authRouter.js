const Router = require('express')
const router = new Router()
const controller = require('./authController')
const { check } = require("express-validator")
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports= router