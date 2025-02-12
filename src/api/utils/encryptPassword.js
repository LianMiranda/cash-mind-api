const bcrypt = require('bcrypt');
const userService = require('../services/user.service');


async function encrypt(password) {
    try {
        if(password){
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
        
            return hash;
        }else{
            return {status: false}
        }
    } catch (error) {
        console.log("Erro inesperadO: "+error);
        throw new Error(error)
    }
}

module.exports = encrypt;