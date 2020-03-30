const express = require('express');
const passport = require('passport')
const controller = require('../controllers/position');
const router =express.Router();

router.get('/', passport.authenticate('jwt', {session:false}),controller.getByCategoryId)
router.post('/', passport.authenticate('jwt', {session:false}),controller.create)
router.patch('/:id', passport.authenticate('jwt', {session:false}),controller.update)
router.post('/delete', passport.authenticate('jwt', {session:false}),controller.remove)


module.exports = router;