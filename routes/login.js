const config = require('config');
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Please signup...');
  const validpassword = await bcrypt.compare(req.body.password,user.password);
  if (!validpassword) return res.status(401).send('Invalid password...');
  const token = user.generateAuthToken();
  res.header('x-auth-token', token);
  res.send(token).statusCode(200);
});


function validateUser(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(schema);
    };
module.exports = router; 
