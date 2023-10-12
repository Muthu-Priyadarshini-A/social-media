const Post = require('../../../models/post')
const Comment = require('../../../models/comment');


module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });


    return res.json(200,{
        message: "List of posts",
        post: posts
    })
}


module.exports.destroy = async function (req, res) {
    try {
        //find a post by id and store it in a post variable
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        // if (post.user == req.user.id) {
            //if the userId of the user who created the post is same as the id of user who is logged in only then delete the post
            post.deleteOne();
            //delete the post
            //go inside comments and search all the comments belonging to a particular post and delete them
            await Comment.deleteMany({ post: req.params.id });
            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     })
            // }
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
            // req.flash('success','Post and associated comments, deleted!')
            return res.status(200).json({
                message: "Posts and associated comments deleted successfully"
            });
        // }
        // //if no post is found for that id, send the control back
        // else {
        //     req.flash('error','Post cannot be deleted by you!')
        //     return res.redirect('back');
        // }

    } catch (err) {
        // req.flash('error',err)
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        });

    }
}