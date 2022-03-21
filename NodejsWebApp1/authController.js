const User = require('./models/User')
const Role = require('./models/Role')
const jwt = require('jsonwebtoken');
const { secret } = require("./config");
const bcrypt = require('bcryptjs')
sha1 = require('js-sha1');

const generateAccessToken = (id,roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn:"24h"})
}
class authController {
    async login(req,res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message:'User ${username} is not found'})
            }
            //const validPassword = bcrypt.compareSync(password, user.password)
            const validPassword = sha1(password)
            if (validPassword != user.password) {
                return res.status(400).json({ message: 'Wrong password entered' })
            }
            //if (validPassword) {
            //    return res.status(400).json({ message: '¬веден неверный пароль' })
            //}
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
            //const { username, password } = req.body
            //const candidate = await User.findOne({ username })

            ////const hashPassword = bcrypt.hashSync(password)
            //const hashPassword = sha1(password)
            //const userRole = await Role.findOne({ value: "USER" })
            //const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            //await user.save()
            //return res.json({message:"User save"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message:'login error'})
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users) 
        } catch (e) {
        }
    }
}

module.exports = new authController()