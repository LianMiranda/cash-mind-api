const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const genToken = require('../utils/genToken');
const {compare}  = require("../utils/encryptPassword");


class AuthService{
    async login(email, password){
        try {
            if(!email || !password){
                return{status: false, message: "Verifique se os campos foram digitados corretamente."}
            }
            const user = await userService.findByEmail(email);
            
            if(user.status){
                const verifyPassword = await compare(password, user.user.password);

                if(verifyPassword){
                    const token = await genToken(user.user, "2h");                    
                    return {status: true, token};
                }else{
                    return{status: false, message: "Credênciais inválidas"}
                }
            }else{
                return{status: false, message: "Esse email não está cadastrado"}
            }
        } catch (error) {
            console.log("Erro inesperado ao fazer login" +error);
            return{status: false, message: "Erro inesperado ao fazer login"}
        }
    }
}

module.exports = new AuthService()