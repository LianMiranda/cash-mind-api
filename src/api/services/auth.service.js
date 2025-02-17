const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const genToken = require('../utils/genToken');
const {compare}  = require("../utils/encryption");

class AuthService{
    async login(email, password){
        try {
            if(!email || !password){ 
                return{status: false, message: "Verifique se os campos foram digitados corretamente.", statusCode: 422}
            }
            const user = await userService.findByEmail(email);
            
            if(user.status){
                const verifyPassword = await compare(password, user.user.password);

                if(verifyPassword){
                    const token = await genToken(user.user, "2h");                    
                    return {status: true, token, statusCode: 200};
                }else{
                    return{status: false, message: "Credênciais inválidas, verifique se os campos foram preenchidos corretamente", statusCode: 400}
                }
            }else{
                return{status: false, message: "Credênciais inválidas, verifique se os campos foram preenchidos corretamente", statusCode: 400}
            }
        } catch (error) {
            console.log("Erro inesperado ao fazer login" +error);
            return{status: false, message: "Erro inesperado ao fazer login", statusCode: 500}
        }
    }

    //TODO REGISTER

    //TODO OAUTH
}

module.exports = new AuthService()