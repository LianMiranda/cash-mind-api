const jwt = require("jsonwebtoken");
const env = require("../../config/EnvConfig/env.config");

async function genToken(user, expiresIn) {
    try {
        const token  = jwt.sign({id: user.id, email: user.email}, env.secret, {expiresIn});
        return token;
    } catch (error) {
        console.log(error);
         throw new Error(error)
    }
}

module.exports = genToken;