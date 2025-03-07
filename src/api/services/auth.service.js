const userService = require("./user.service");
const genToken = require('../utils/genToken');
const {compare}  = require("../utils/encryption");
const User = require("../models/User");
const { v4 } = require("uuid");
const emailValidate = require("../utils/emailValidate");
const cpfValidate = require("../utils/cpfValidate");
const {encrypt} = require("../utils/encryption");

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

    async register(email, password, firstName, lastName, cpf){
        if(!email || !password || !firstName || !lastName || !cpf){
            return{status:false, message: "Verifique se todos os campos foram preenchidos", statusCode: 400}
        }
        
        const validateEmail = emailValidate(email);
        const validateCPF = cpfValidate(cpf);
        
        if(!validateEmail){
            return{status:false, message: "Formato de email inválido",  statusCode: 400}
        }

        if(!validateCPF){
            return{status:false, message: "CPF inválido",  statusCode: 400}
        }
        
        const verifyEmail = await userService.findByEmail(email);
        
        if(verifyEmail.status){
            return{status:false, message: "Já existe um usuário cadastrado com esse endereço de email",  statusCode: 409}
        }

        try {
            const hash = await encrypt(password);

            const user = await userService.create({email: email, password: hash, firstName: firstName, lastName: lastName, cpf: cpf});
            
            if(user.status){
                const token = await genToken(user.user, "2h");                
                return{status: true, message: "Usuário cadastrado com sucesso", statusCode: 201, token: token}
            }

            return{status: false, message: "Erro ao cadastrar usuario", statusCode: 400}
        } catch (error) {
            console.log("Erro inesperado ao registrar usuario" +error);
            return{status: false, message: "Erro inesperado ao registrar usuario", statusCode: 500}
        }
    }

    async userOAuth({email, password, firstName, lastName, cpf, googleId}){
        try {
            let user = await User.findOne({where:{googleId}});
            
            const id = v4()
            if(!user){
                user = await User.create({
                        id: id, 
                        email: email,
                        password: password, 
                        firstName: firstName, 
                        lastName: lastName, 
                        cpf: cpf, 
                        googleId: googleId
                    })  
                }
            return user;
        } catch (error) {
            console.log(error); 
        }

    }
}

module.exports = new AuthService()