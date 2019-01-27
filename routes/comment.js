const config = require('config');
const jwt = require('jsonWebToken');
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const {Comment, validate} = require('../models/comment');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/login')
const user = require('../models/user')
const blog = require('../models/blog')
const {User} = require('../models/user');
const {Blog} = require('../models/blog')
const router = express.Router();


router.post('/:id/comments', auth, async (req, res) => {
 const user = await User.findById(req.user._id).select('-password');
 if (!user) 
 {
     return res.status(401).send('Invalid user...');   
 }
 const blog = await Blog.findById(id);
 if (!blog) 
 {
     return res.status(401).send('Invalid blog...');   
 }
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  comment = new Comment(
      {
          content : req.body.content,
          blog : req.params.id,
          user : req.user._id
      });
  await comment.save();
  res.status(201).send('insert successfull ....');
});
module.exports = router;
