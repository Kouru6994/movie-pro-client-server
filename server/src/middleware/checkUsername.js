const User = require('../models/user.models');

const checkUsername =  (req, res, next) => {
    const { user_name } = req.body;
    User.findUserByUserName(user_name, (_, data) => {
        if (data) {
            res.status(400).send({
                status: 'error',
                message: `A user with user name : '${user_name}' already exits`
            });
            return;
        }
        next();
    });
}

module.exports = checkUsername;