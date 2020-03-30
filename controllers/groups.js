const Groops = require('../models/groups');
const Lessons = require('../models/lesson');
const errorHendler = require('../utils/erorhendler');

module.exports.create = async function(req, res){

    const group = new Groops({
        name: req.body.name,
        teacher: req.body.userName || req.user.userName,
        teacherId: req.body.teacherId || req.user._id,
        schedule: req.body.schedule,
        discordId: req.body.discordId
    })
    try{
        await group.save()
        res.status(201).json(group)
    }catch(e){
        errorHendler(res,e)
    }
}

module.exports.update = async function(req, res){
    
    const updated = {
        name: req.body.name,
        teacher: req.body.teacher,
        teacherId: req.body.teacherId,
        discordId: req.body.discordId
    }

    try{
        const group = await Groops.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:updated},
            {useFindAndModify:true})
        res.status(200).json(group)
    }catch(e){
        errorHendler(res,e)
    }
}

module.exports.getAll = async function(req, res){
    if(req.user.isTeacher){
        try{
            const group = await Groops.find(
                {teacherId: req.user._id})
            res.status(200).json(group)
        }catch(e){
            errorHendler(res,e)
        }
    }else{
        try{
            const group = await Groops.find(
                {_id: req.user.groupsList})
            res.status(200).json(group)
        }catch(e){
            errorHendler(res,e)
        }
    }
    
}

module.exports.getOne = async function(req, res){
        try{
            const group = await Groops.findOne(
                {_id: req.params.id})
            res.status(200).json(group)
        }catch(e){
            errorHendler(res,e)
        }
}

module.exports.remove = async function(req, res){
    try{
        await Groops.remove({
            _id:req.params.id
        })
        await Lessons.remove({group: req.params.id})
        res.status(200).json({
            message:"Category delete"
        })
    } catch(e){
        errorHendler(res,e)
    }
}
