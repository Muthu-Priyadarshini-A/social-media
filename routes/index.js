const express = require('express');
const router = express.Router();

module.exports= router;

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);