const User = require('../models/User');
const errorHendler = require('../utils/erorhendler');


module.exports.addToGroup = async function(req, res){
    
    if(req.user.isAdmin){
        try{
            const user = await User.updateOne({
                _id: req.body.id},
                {$push: {groupsList: req.params.groupId}})
            res.status(200).json(user)
        }catch(e){
            errorHendler(res,e)
        }
    }else{
        try{
            res.status(403).json({
                message: "Недостаточно прав!"
            })
        }catch(e){
            errorHendler(res,e)
        }
    }
}

module.exports.removeFromGroup = async function(req,res){
    if(req.user.isAdmin){
        const user = await User.updateOne({
            _id: req.body.id},
            {$set: {groupsList: []}})
        res.status(200).json(user)
    }else{
        res.status(401).json({
            message:"Недостаточно прав"
        })
    }
}

module.exports.getAllUsers = async function(req, res){
    if(req.user.isAdmin){
        const users = await User.find({})
            res.status(200).json(users)
    }else{
        try{
            res.status(403).json({
                message: "Недостаточно прав!"
            })
        }catch(e){
            errorHendler(res,e)
        }
    }
}

module.exports.whoIAm = async function(req,res){
    res.status(200).json({
        isTeacher: req.user.isTeacher,
        isAdmin:req.user.isAdmin
    })
}

module.exports.remove = async function(req,res){
    if(req.user.isAdmin){
        try {
            await User.deleteOne({_id:req.body.id})
            res.status(200).json({
                message:'Пользователь удален'
            })
        } catch(e){
            errorHendler(res,e)
        }
    }else{
        res.status(401).json({
            message:"Недостаточно прав"
        })
    }
}

module.exports.giveTeacher = async function(req,res){
    if(req.user.isAdmin){
        try {
            const user = await User.findOneAndUpdate({
                _id: req.params.id},
                {$set: req.body},
                {new: false})
            res.status(200).json(user)
        } catch(e){
            errorHendler(res,e)
    }
    }else{
        res.status(401).json({
            message:"Недостаточно прав"
        })
    }
}
