const { asyncHandler } = require('../middleware/asynchandler');
const checkEmail = require('../middleware/checkEmail');
const checkUsername = require('../middleware/checkUsername')
const { register: registerValidator, login: loginValidator } = require('../validators/auth');
const authController = require('../controller/auth');

const router = require('express').Router();

router.route('/register')
    .post(
        registerValidator, 
        asyncHandler(checkUsername),
        asyncHandler(checkEmail), 
        asyncHandler(authController.register)
    );

router.route('/login').post(
    loginValidator,
    asyncHandler(authController.login)
)

module.exports = router;