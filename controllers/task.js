const Task = require('../models/task')
const errorHendler = require('../utils/erorhendler')

module.exports.getAll = async function(req, res){
    try {
        const task = await Task
        .find({lesson: req.params.id})
        .sort({order: 1})
        res.status(200).json(task)
    } catch (e) {
        errorHendler(res, e)
    }
}

module.exports.create = async function(req, res){
    try{
        const lastOrder = await Task
        .findOne({lesson: req.params.id})
        .sort({order:-1})

        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Task({
            tasksList: req.body.task,
            lesson: req.params.id,
            order: maxOrder + 1,
            title: req.body.title
        }).save()
        res.status(200).json(order)
    }catch(e){
        errorHendler(res, e)
    }
}
