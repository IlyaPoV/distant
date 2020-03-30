const express = require('express');
const passport = require('passport');
const controller = require('../controllers/groups');
const router = express.Router();
require('../middleware/passport')(passport)


router.post('/', passport.authenticate('jwt', {session:false}), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session:false}), controller.update);
router.get('/', passport.authenticate('jwt', {session:false}), controller.getAll);
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getOne);


router.delete('/:id', passport.authenticate('jwt', {session:false}), controller.remove)
module.exports = router;