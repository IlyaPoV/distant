const Lesson = require('../models/lesson')
const errorHendler = require('../utils/erorhendler')

module.exports.getAll = async function(req, res){
    try {
        const orders = await Lesson
        .find({group: req.params.id})
        .sort({order: 1})
        res.status(200).json(orders)
    } catch (e) {
        errorHendler(res, e)
    }
}

module.exports.create = async function(req, res){
    try{
        const lastOrder = await Lesson
        .findOne({group: req.params.id})
        .sort({order:-1})

        const maxOrder = lastOrder ? lastOrder.order : 0;

        const order = await new Lesson({
            tasksList: req.body.task,
            group: req.params.id,
            order: maxOrder + 1,
            title: req.body.title
        }).save()
        res.status(200).json(order)
    }catch(e){
        errorHendler(res, e)
    }
}
