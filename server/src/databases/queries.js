const { DB_NAME } = require('../utils/secret')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS m_users (
    id varchar(255) NOT NULL,
    name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    user_name varchar(255) NOT NULL,
    email varchar(255) DEFAULT NULL,
    no_hp varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
    password text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    profile_picture text,
    birth_date text,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login text,
    PRIMARY KEY (id)
)
`;

const updateLastLoginByUsername = `
UPDATE m_users SET last_login = ? WhERE user_name = ?
`;

const createNewUser = `
INSERT INTO m_users (id, name, user_name, email, no_hp, password, last_login) VALUES (?,?,?,?,?,?,?)
`;

const findUserByEmail = `
SELECT * FROM m_users WHERE email = ?
`;

const findUserByPhone = `
SELECT * FROM m_users WHERE no_hp = ?
`;

const findUserByUserName = `
SELECT * FROM m_users WHERE user_name = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    findUserByPhone,
    findUserByUserName,
    updateLastLoginByUsername
};