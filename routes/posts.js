const express = require('express');
const { post } = require('../controllers/posts_controller');

const router = express.Router();

const postsController = require('../controllers/posts_controller')

router.get('/post', postsController.post);

module.exports=router;