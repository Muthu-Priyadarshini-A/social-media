const User = require('../models/user');
const fs = require('fs');
const path = require('path')

module.exports.profile=function(req,res){
    User.findById(req.params.id)
    .then(user=>{
        return res.render('users_profile',{
            title: "Profile",
            profile_user: user
        })
    })
    
}

// module.exports.update = function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body)
//         .then(user=>{
//             return res.redirect('back')
//         })
//     } else{
//         return res.status(401).send('Unauthorized');
//     }
// }

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){console.log('*****Multer Error:', err)}

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
                // console.log(req.file);
            })

        }catch(err){
            req.flash('error', err);
            return res.redirect('back')
        }
    }else{
        req.flash('error', 'Unauthorized!!')
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