const { query } = require("../db")
const ApiError = require('../error/Apierror')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/model')

const generateJWT = (id, email, ) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next)  {
        const {email, password} = req.body
        console.log('Регистрация:', email, password); 
        if(!email || !password){
            return next(ApiError.badRequest('Неккоректный email или пароль'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        const token = generateJWT(user.id , user.email)
        return res.json({token})
    }
    async login(req, res, next)  {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user)
        {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Пароль неверный'))
        }
        const token = generateJWT(user.id , user.email)
        return res.json({token})
    }
    async check(req, res, next)  {
        const token = generateJWT(req.user.id, req.user.email)
        res.json({token})
    }

}

module.exports = new UserController()