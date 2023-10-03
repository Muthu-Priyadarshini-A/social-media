const Post = require('../models/post')

module.exports.home=function(req,res){
    // console.log(req.cookies);
  //popilate the user of each post

    Post.find({})
    .populate('user')
    .populate(
      {
        path: 'comments',
        populate: {
          path: 'user'
        }
      }
    )
    .exec()
        .then((posts)=>{
            return res.render('home', {
                    title: "Home",
                    posts: posts
            })
        })
      
}

// return res.render('home', {
//     title: "Home",
//     posts: posts