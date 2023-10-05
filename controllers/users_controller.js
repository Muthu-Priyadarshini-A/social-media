const User = require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id)
    .then(user=>{
        return res.render('users_profile',{
            title: "Profile",
            profile_user: user
        })
    })
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body)
        .then(user=>{
            return res.redirect('back')
        })
    } else{
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success', 'Logged in successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.flash('Success', 'Logges out sucessfully')
        return res.redirect('/');
        // res.redirect('/', {flash: {success: "Logged out successfully"}});
        
      });
      
   
   
    // req.logout();

    // return res.redirect('/');
}