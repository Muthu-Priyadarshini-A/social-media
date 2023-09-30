const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controller');

router.get('/profile', usersControllers.profile);
router.get('/sign-in',usersControllers.signIn );
router.get('/sign-up', usersControllers.signUp);

router.post('/create', usersControllers.create);
// router.get('create-session', usersControllers.createSession)

module.exports=router;