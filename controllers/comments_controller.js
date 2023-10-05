const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            // req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        // req.flash('error', err);
        console.log('Error',err)
        return;
    }
    
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await  Comment.findById(req.params.id)
    
        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.deleteOne();
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            
                return res.redirect('back')
           
        } else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err)
        return;
    }
  
    
}

// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id)
//     .then(comment =>{
//         if(comment.user == req.user.id){

//             let postId = comment.post;

//             comment.deleteOne();
//             Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
//             .then(()=>{
//                 return res.redirect('back')
//             })
//         } else{
//             return res.redirect('back');
//         }
//     })
// }

// module.exports.create = function(req, res){

//     Post.findById(req.body.post)
//     .then(post=>{
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }
//             .then(comment=>{
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/')
//             })
//             .catch(err=>{
//                 console.log('Error in posting comments',err);
//                     return;
//             })
//             // }, function(err, comment){
//             //     if(err){
//             //         console.log('Error in posting comments');
//             //         return;
//             //     }
//             //     post.comments.push(comment);
//             //     post.save();

//             //     res.redirect('/')
//             // }
            
//             )
//         }
//     })
// }