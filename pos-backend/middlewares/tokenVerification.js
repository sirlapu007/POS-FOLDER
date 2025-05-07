const createHttpError = require("http-errors");
const config = require("../config/config");
const jwt = require('jsonwebtoken');
const User = require('../models/useModel');  

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if(!accessToken){
      const error = createHttpError(401, "Please provide token!");
      return next(error);
    }

    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);
    const user = await User.findById(decodeToken._id);
    if(!user){
      const error = createHttpError(401, "USer not exist!");
      return next(error);
    }

    req.user = user;
    next();

  } catch (error) {
    const err = createHttpError(401, "Invalid Token!");
    next(err);
  }
}

module.exports = { isVerifiedUser };
