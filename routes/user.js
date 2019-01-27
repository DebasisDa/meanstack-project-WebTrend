const config = require('config');
const jwt = require('jsonWebToken');
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/login')
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered... please login');

  user = new User(
      {
          name : req.body.name,
          email : req.body.email,
          password : req.body.password

      });

  const salt = await bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(201).send('Signup successfully done')
});
module.exports = router;
