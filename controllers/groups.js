const Groops = require('../models/groups');
const Lessons = require('../models/lesson');
const errorHendler = require('../utils/erorhendler');

module.exports.create = async function(req, res){
    const group = new Groops({
        name: req.body.name,
        teacher: req.user.userName,
        teacherId: req.user._id
    })

    try{
        await group.save()
        console.log(group)
        res.status(201).json(group)
    }catch(e){
        errorHendler(res,e)
    }
}

module.exports.update = async function(req, res){
    
    const updated = {
        name: req.body.name,
        teacher: req.body.teacher,
        teacherId: req.body.teacherId
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
    
    try{
        const group = await Groops.find(
            {teacherId: req.user._id})
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
