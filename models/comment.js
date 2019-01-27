const config = require('config');
const jwt = require('jsonWebToken');
const Joi = require('joi');
const mongoose = require('mongoose');
const {Blog} = require('../models/blog');
const {User} = require('../models/user');

const commentSchema = new mongoose.Schema({
 
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    unique: true
  },

  blog:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});


const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
  const schema = {
    content: Joi.string().min(1).max(50).required(),
  };
  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;