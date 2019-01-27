const config = require('config');
const jwt = require('jsonWebToken');
const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('../models/user');

const blogSchema = new mongoose.Schema({
  tags : [{
    type : [String],
    validate: {
        validator: function(v) {
            return v.length > 0;

        },
        message: 'A course should have atleast one tag'

    }

}],
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
    unique: true
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});


const Blog = mongoose.model('Blog', blogSchema);

function validateBlog(blog) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    content: Joi.string().min(10).max(1000).required(),
    tags : Joi.array().items(Joi.string()).required()
  };
  return Joi.validate(blog, schema);
}

exports.Blog = Blog;
exports.validate = validateBlog;