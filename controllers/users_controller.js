const User = require('../models/user');

module.exports.profile=function(req,res){
    return res.render('users_profile',{
        title: "Profile"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('users_sign_in',{
        title: "Sign-In"
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_up',{
        title: "Sign-Up"
    })
}

module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return}

    //     if (!user){
    //         User.create(req.body, function(err, user){
    //             if(err){console.log('error in creating user while signing up'); return}

    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }

    // });

    User.findOne({email: req.body.email})
    .then(user=>{
        if(!user){
            User.create(req.body)
            .then(user=>{
                return res.redirect('/users/sign-in');
            })
            .catch(err=>{
                console.log('error in creating user while signing up'); return
            })
        }
    })
    .catch(err=>{
        console.log('error in finding user in signing up'); 
        return;
    })
}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
   
   
    // req.logout();
    // return res.redirect('/');
}