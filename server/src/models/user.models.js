const { date } = require('joi');
const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, findUserByPhone: findUserByPhoneQuery, findUserByUserName: findUserByUserNameQuery, updateLastLoginByUsername: updateLastLogin } = require('../databases/queries');
const { logger } = require('../utils/logger');

class User {

    constructor(id, name, user_name, email, no_hp, password, last_login) {
        this.id = id;
        this.name = name;
        this.user_name = user_name;
        this.email = email;
        this.no_hp = no_hp;
        this.password = password;
        this.last_login = last_login;
    }

    static UsernameAndLastLoginInstance(user_name, last_login) {
        return new User(null, null, user_name, null, null, null, last_login);
    }

    static createUsers(newUser, cb) {
        db.query(
            createNewUserQuery,
            [
                newUser.id,
                newUser.name,
                newUser.user_name,
                newUser.email,
                newUser.no_hp,
                newUser.password,
                newUser.last_login
            ],
            (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.id,
                    name: newUser.name,
                    user_name: newUser.user_name,
                    email: newUser.email,
                    no_hp: newUser.no_hp,
                    last_login: newUser.last_login
                });
            });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static findUserByUserName(userName, cb) {
        db.query(findUserByUserNameQuery, userName, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    
    static findByPhone(phoneNum, cb) {
        db.query(findUserByPhoneQuery, phoneNum, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static updateLastLoginByUsername(data, cb) {
        db.query(updateLastLogin, [data.datetime, data.user_name], (err, res) => {
            console.log("err update lastlogin: ", err)
            console.log("res update lastlogin: ", res)
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb(null, {
                
            });
        })
    }
}

module.exports = User;