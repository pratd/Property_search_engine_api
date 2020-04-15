const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../models/user');
const createUserSchema = require('../schemas/createUser');
const 