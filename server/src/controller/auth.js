const { compare } = require('../utils/password');
const User = require('../models/user.models');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');
const { v4: uuidv4 } = require('uuid');

const dateLogin = new Date().toISOString()

const register = (req, res) => {
    const { name, user_name, email, no_hp, password } = req.body;
    const hashedPassword = hashPassword(password);

    const user = new User(uuidv4(), name, user_name, email, no_hp, hashedPassword, dateLogin);

    console.log("user req: ", user)

    User.createUsers(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "ok",
                data: {
                    token,
                    data
                }
            });
        }
    })
}

const login = (req, res) => {
    const { user_name, password } = req.body
    User.findUserByUserName(user_name, (err1, dataUser) => {
        if (err1) {
            console.log("err1: ",err1)
            res.status(500).send({
                status: "error",
                message: err1.message
            })
        } else {
            var isPasswordValid = compare(password, dataUser.password)
            console.log("is valid pass: ", isPasswordValid)
            if (isPasswordValid) {
                const token = generateToken(dataUser.id);
                const lastLogins = User.UsernameAndLastLoginInstance(user_name, dateLogin)
                User.updateLastLoginByUsername(lastLogins, (err2, data) => {
                    if (err2) {
                        console.log("err2: ",err2)
                        res.status(500).send({
                            status: "error",
                            message: err2.message
                        })
                    } else {
                        res.status(200).send({
                            status: "ok",
                            data: {
                                token,
                                user: {
                                    name: dataUser.name,
                                    username: dataUser.user_name,
                                    email: dataUser.email,
                                    nohp: dataUser.no_hp,
                                    profilePicture: dataUser.profilePicture,
                                    birthDate: dataUser.birth_date,
        
                                }
        
                            }
                        })
                    }
                })
            } else {
                res.status(400).send({
                    status: "error",
                    message: "Invalid Password"
                })
            }
        }
    });
}

module.exports = {
    register,
    login
}