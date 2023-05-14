const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const { trusted } = require('mongoose');

// @desc   Register User
// @route  POST /api/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role} = req.body;

  //Create user
  const user = await User.create({
   name,
   email,
   password,
   role
  });
  
  console.log(user);
  sendTokenResponse(user, 200, res);
});

// @desc   Login User
// @route  POST /api/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password} = req.body;
  
  console.log(email);
  console.log(password);

  /// validate email & password
  if(!email || !password){
    return next(new ErrorResponse('Please Provide an email annd password', 400));
  }
  
  // check for user
  const user = await User.findOne({ email}).select('+password');

  console.log(user);

  if(!user){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //check if password match
  const isMatch = await user.matchPassword(password);
  console.log(isMatch);

  if (!isMatch){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});


// Get token from model, create and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();
  
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 *60 * 1000
      ),
    httpOnly: true
  };

  if(process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  

  res
   .status(statusCode)
   .cookie('token', token, options)
   .json({
    success: true,
    token
    });
}

