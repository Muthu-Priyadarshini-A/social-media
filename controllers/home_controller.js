const Post = require('../models/post')
const User = require('../models/user');


module.exports.home= async function(req,res){
    // console.log(req.cookies);
  //popilate the user of each post

  try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });

    let users = await User.find({});
      
            return res.render('home', {
              title: "Home",
              posts: posts,
              all_users: users
      })
  }
  catch(err){
    console.log('Error', err);
    return;
  }
    
          
}

// module.exports.home=function(req,res){
//   // console.log(req.cookies);
// //popilate the user of each post

//   Post.find({})
//   .populate('user')
//   .populate(
//     {
//       path: 'comments',
//       populate: {
//         path: 'user'
//       }
//     }
//   )
//   .exec()
//       .then((posts)=>{
//         User.find({})
//         .then(users=>{
//           return res.render('home', {
//             title: "Home",
//             posts: posts,
//             all_users: users
//     })
//         })
          
//       })
    
// }

// return res.render('home', {
//     title: "Home",
//     posts: posts