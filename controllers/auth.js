const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const keys = require('../config/keys')
const errorHendler = require('../utils/erorhendler')

module.exports.login = async function(req,res){
    if(req.body.password.length<6){
        res.status(406).json({
            message: 'Пароль должен быть длиннее 6 символов'
        })
    }
    
    const candidate = await User.findOne({
        email: req.body.email
    })
    if(candidate){
        //ok. lets check pass
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        
        if(passwordResult){
            const token = jwt.sign({
                email:candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: 'Неверный пароль'
            })
        }
    }else{
        //no candidate. error
        res.status(404).json({
            message: 'Пользователь не найден.',
        })
    }
}

module.exports.register = async function(req,res){
    
    const candidate = await User.findOne({email: req.body.email})
    if(candidate){
        //пользователь найден, отдать ошибку
        res.status(409).json({
            message: "Email уже занят. Попробуйте другой."
        })
    }else{
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const userName = req.body.userName;
        const userSurname = req.body.userSurname;
        const user = new User({
            email:req.body.email,
            password: bcrypt.hashSync(password,salt),
            userName: userName,
            userSurname: userSurname
        })
        
        try{
            await user.save()
            res.status(201).json(user)
        }catch(e){
            errorHendler(res,e)
        }
    }
}