const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersControllers = require('../controllers/users_controller');

// router.get('/profile', passport.checkAuthentication, usersControllers.profile);

router.get('/profile/:id', passport.checkAuthentication, usersControllers.profile);
router.post('/update/:id', passport.checkAuthentication, usersControllers.update)
router.get('/sign-in',usersControllers.signIn );
router.get('/sign-up', usersControllers.signUp);

router.post('/create', usersControllers.create);
// router.get('create-session', usersControllers.createSession)

//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersControllers.createSession)

router.get('/sign-out', usersControllers.destroySession);

module.exports=router;