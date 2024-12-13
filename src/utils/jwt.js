const jwt = require('jsonwebtoken');
require('dotenv').config();

async function createAccessToken(payload) {
    return new Promise((resolve, rejected) => {

        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {

            if (err) rejected(err);

            resolve(token);

        });

    });
}

module.exports = {createAccessToken};