const express = require('express');
const passport = require('passport')
const router = express.Router();
const controller = require('../controllers/users');

router.patch('/:groupId', passport.authenticate('jwt', {session:false}), controller.addToGroup);
router.get('/', passport.authenticate('jwt', {session:false}), controller.getAllUsers);
router.get('/whoiam',  passport.authenticate('jwt', {session:false}), controller.whoIAm);
router.delete('/', passport.authenticate('jwt',{session:false}), controller.remove);
router.put('/', passport.authenticate('jwt',{session:false}), controller.removeFromGroup);
router.patch('/perms/:id', passport.authenticate('jwt',{session:false}), controller.giveTeacher)
module.exports = router;