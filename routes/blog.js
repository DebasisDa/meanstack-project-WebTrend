const config = require('config');
const jwt = require('jsonWebToken');
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const {Blog, validate} = require('../models/blog');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/login')
const user = require('../models/user')
const {User} = require('../models/user');
const router = express.Router();


router.post('/', auth, async (req, res) => {
   const user = await User.findById(req.user._id).select('-password');
   if (!user) 
    {
      return res.status(401).send('Invalid user...');   
    }
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  blog = new Blog(
      {
          title : req.body.title,
          content : req.body.content,
          tags : req.body.tags,
          user : req.user._id
      });
  await blog.save();
  res.status(201).send('insert successfull ....');
});
module.exports = router; 
