const config = require('config');
const jwt = require('jsonWebToken');
const _ = require('lodash')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/login')
const {User, validate} = require('../models/user');


router.get('/', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) 
    {
      return res.status(401).send('Invalid user...');   
    }
    res.send(user);
});
module.exports = router; 
