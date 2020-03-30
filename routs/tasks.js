const express = require('express');
const passport = require('passport');
const controller = require('../controllers/task');
const router = express.Router();
require('../middleware/passport')(passport)


router.post('/:id', passport.authenticate('jwt', {session:false}), controller.create);
router.get('/:id', passport.authenticate('jwt', {session:false}), controller.getAll)

module.exports = router;