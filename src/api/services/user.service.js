const User = require("../models/User");
const { AppError } = require("../utils/customErrors");
const {encrypt} = require("../utils/encryption");
const bcrypt = require('bcrypt');

class UserService{
    async create(email, password, firstName, lastName, cpf){

        if(!email || !password || !firstName || !lastName || !cpf){
            throw new AppError("Verifique se todos os campos foram preenchidos", 400);
        }
        
        const verifyEmail = await this.findByEmail(email);
        
        if(verifyEmail.status){
            throw new AppError("Já existe um usuário cadastrado com esse endereço de email", 409);
        }

        try {
           const hash = await encrypt(password);

            const user = await User.create({email, password: hash, firstName, lastName, cpf});

            return{status: true, message: "Usuário cadastrado com sucesso", user}

        } catch (error) {
            console.log(error);
            throw new AppError("Erro inesperado ao cadastrar usuário", 500);
        }       
    }

    //TODO Mudar a forma como o erro é tratado nas outras funções
    async find(){
        try {
            const user = await User.findAll();

            if(user.length === 0){
                return{status: false, message: "Nenhum usuario encontrado"}
            }else{
                return{status: true, message: "Usuários encontrados", user}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar usuarios"}
        }
    }
    
    async findById(id){
        try {
            const user = await User.findOne({where: {id: id}});
            
            if(user){
                return{status: true, user}
            }else{
                return{status: false, message: "Nenhum usuario encontrado"}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar usuarios"}
        }
    }

    async findByEmail(email){
        try {
            const user = await User.findOne({where: {email: email}});

            if(user){
                return{status: true, user}
            }else{
                return{status: false, message: "Nenhum usuario encontrado"}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar usuarios"}
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
                        return{status:false, message: "Já existe um usuario com esse endereço de email"}
                    }

                    updateUser.email = email;
                }

                if(newPassword){
                    if (!actualPassword) {
                        return({status: false, message: "Caso queira alterar para uma nova senha, é obrigatório digitar a senha atual." });
                    }
                    
                    const isValidPassword = await bcrypt.compare(actualPassword, userExists.user.password);
                                            
                    if(isValidPassword){
                            password = await encrypt(newPassword);
                            updateUser.password = password;
                    }else{
                            return({status: false, message:"Senha atual incorreta"});
                    }
                }

                if(firstName)updateUser.firstName = firstName;
                if(lastName)updateUser.lastName = lastName;
                if(cpf)updateUser.cpf = cpf;
                
                const user = await User.update(updateUser, {where:{id: id}});
 
                if(user == 0){
                    return{status:false, message: "Erro ao atualizar usuário, verifique os campos e tente novamente"}
                }else{
                    return{status:true, message: `Usuário com id ${id} atualizado com sucesso`}
                }
            }else{
                return{status:false, message: "Usuário não encontrado"}
            }

        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao atualizar usuário"}
        }
    }

    async delete(id){
        try {
            const userExists = await this.findById(id);

            if(userExists.status){
                const deleteUser =  await User.destroy({where:{id: id}});
                console.log(deleteUser);
                
                if(deleteUser == 0){
                    return{status: false, message: "Erro ao deletar usuário"}
                }else{
                    return{status: true, message: `Usuário com id ${id} deletado com sucesso`}
                }
            }else{
                return{status: false, message: `Usuário não encontrado`}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao deletar usuário"}
        }
    }

    async deleteByEmail(email){
        try {
            const userExists = await this.findByEmail(email);

            if(userExists.status){
                const deleteUser =  await User.destroy({where:{email: email}});
                
                if(deleteUser == 0){
                    return{status: false, message: "Erro ao deletar usuário"}
                }

                return{status: true, message: `Usuário com email ${email} deletado com sucesso`}
                
            }else{
                return{status: false, message: `Usuário não encontrado`}
            }
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao deletar usuário"}
        }
    }
}

module.exports = new UserService();