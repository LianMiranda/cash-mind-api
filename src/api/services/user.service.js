const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { AppError } = require("../utils/customErrors");
const {encrypt} = require("../utils/encryption");
const bcrypt = require('bcrypt');
const {v4} = require('uuid');
const emailValidate = require("../utils/emailValidate");
const testaCPF = require("../utils/cpfValidate");

class UserService{
    async create(email, password, firstName, lastName, cpf){

        if(!email || !password || !firstName || !lastName || !cpf){
            return{status:false, message: "Verifique se todos os campos foram preenchidos", statusCode: 400}
        }
        
        const validateEmail = emailValidate(email);
        const validateCPF = testaCPF(cpf);
        
        if(!validateEmail){
            return{status:false, message: "Formato de email inválido",  statusCode: 400}
        }

        if(!validateCPF){
            return{status:false, message: "CPF inválido",  statusCode: 400}
        }
        
        const verifyEmail = await this.findByEmail(email);
        
        if(verifyEmail.status){
            return{status:false, message: "Já existe um usuário cadastrado com esse endereço de email",  statusCode: 409}
        }

        try {
            const hash = await encrypt(password);
            const id = v4()
            const user = await User.create({id, email, password: hash, firstName, lastName, cpf});

            return{status: true, message: "Usuário cadastrado com sucesso", user, statusCode: 201}

        } catch (error) {
            console.log(error);
            throw new AppError("Erro inesperado ao cadastrar usuário", 500);
        }       
    }

    async find(){
        try {
            const user = await User.findAll();

            if(user.length === 0){
                return{status: false, message: "Nenhum usuario encontrado", statusCode: 404}
            }else{
                return{status: true, message: "Usuários encontrados", user, statusCode: 200}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar usuarios", statusCode: 500}
        }
    }
    
    async findById(id){
        try {
            const user = await User.findOne({
                where: {id: id},
                include: [{
                    model: Transaction, as: 'transactions'
                }]
            });
            
            if(user){
                return{status: true, user, statusCode: 200}
            }else{
                return{status: false, message: "Nenhum usuario encontrado",  statusCode: 404}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar usuarios",  statusCode: 500}
        }
    }

    async findByEmail(email){
        try {
            const user = await User.findOne({where: {email: email}});

            if(user){
                return{status: true, user, statusCode: 200}
            }else{
                return{status: false, message: "Nenhum usuario encontrado",  statusCode: 404}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar usuarios",  statusCode: 500}
        }
    }


    async update(id, email, newPassword, actualPassword, firstName, lastName, cpf){
        try {
            let updateUser = {};
            let password;
            const userExists = await this.findById(id);

            if(userExists.status){
                if(email){
                    const emailExists = await this.findByEmail(email);

                    if(emailExists.status){
                        return{status:false, message: "Já existe um usuário cadastrado com esse endereço de email",  statusCode: 409}
                    }

                    updateUser.email = email;
                }

                if(newPassword){
                    if (!actualPassword) {
                        return({status: false, message: "Caso queira alterar para uma nova senha, é obrigatório digitar a senha atual.", statusCode: 400 });
                    }
                    
                    const isValidPassword = await bcrypt.compare(actualPassword, userExists.user.password);
                                            
                    if(isValidPassword){
                            password = await encrypt(newPassword);
                            updateUser.password = password;
                    }else{
                            return({status: false, message:"Senha atual incorreta", statusCode: 400});
                    }
                }

                if(firstName)updateUser.firstName = firstName;
                if(lastName)updateUser.lastName = lastName;
                if(cpf)updateUser.cpf = cpf;
                
                const user = await User.update(updateUser, {where:{id: id}});
 
                if(user == 0){
                    return{status:false, message: "Erro ao atualizar usuário, verifique os campos e tente novamente", statusCode: 400}
                }else{
                    return{status:true, message: `Usuário com id ${id} atualizado com sucesso`, statusCode: 200}
                }
            }else{
                return{status:false, message: "Usuário não encontrado",  statusCode: 404}
            }

        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao atualizar usuário", statusCode: 500}
        }
    }

    async delete(id){
        try {
            const userExists = await this.findById(id);

            if(userExists.status){
                const deleteUser =  await User.destroy({where:{id: id}});
                
                if(deleteUser == 0){
                    return{status: false, message: "Erro ao deletar usuário", statusCode: 400}
                }else{
                    return{status: true, message: `Usuário com id ${id} deletado com sucesso`, statusCode: 200}
                }
            }else{
                return{status: false, message: `Usuário não encontrado`, statusCode: 404}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao deletar usuário", statusCode: 500}
        }
    }
}

module.exports = new UserService();