const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

            req.flash('success','Post published!')
            return res.redirect('back');
       
    }catch(err){
        req.flash('error',err)
        console.log('error in creating a post'); 
        return;
    }
           
}


module.exports.destroy = async function (req, res) {
    try {
        //find a post by id and store it in a post variable
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            //if the userId of the user who created the post is same as the id of user who is logged in only then delete the post
            post.deleteOne();
            //delete the post
            //go inside comments and search all the comments belonging to a particular post and delete them
            await Comment.deleteMany({ post: req.params.id });
            // after the post and all its associated comments have been deleted from the database
            //we check if the req object is ajax/jquery req object
            // if(req.xhr){
            // //  console.log(req.params.id);
            //   return res.status(200).json({
            //     data: {
            //         post_id: req.params.id
            //     },
            //     message: 'Post deleted !'
            //   })
            // }
            req.flash('success','Post and associated comments, deleted!')
            return res.redirect('back');
        }
        //if no post is found for that id, send the control back
        else {
            req.flash('error','Post cannot be deleted by you!')
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error',err)
        console.log("Error: ", err);
        return;

    }
}

// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id)
//     .then(post=>{
//         //.id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id})
//             .then(()=>{
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back')
//         }

        
//     });
// }



// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id, function(err, post){
//         // .id is in string for comparison
//          if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 // req.flash('success', 'Post deleted');
//                 return res.redirect('back');
//             });
//          }else{
//              return res.redirect('back');
//          }

//     });
// }