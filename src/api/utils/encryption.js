const bcrypt = require('bcrypt');
const env= require('../../config/EnvConfig/env.config');


async function encrypt(password) {
    try {
        if(password){
            const salt =  bcrypt.genSaltSync(env.salt);
            const hash =  bcrypt.hashSync(password, salt);
            return hash;
        }else{
            return {status: false, message: "Erro ao salvar senha"}
        }
    } catch (error) {
        console.log("Erro inesperadO: "+error);
        throw new Error(error)
    }
}

async function compare(password, userPassword) {
    try {
        if(password){            
            const comparePass = bcrypt.compare(password, userPassword);
            return comparePass;
        }else{
            return {status: false, message: "Erro ao salvar senha"}
        }
    } catch (error) {
        console.log("Erro inesperadO: "+error);
        throw new Error(error)
    }
}

module.exports = {encrypt, compare};