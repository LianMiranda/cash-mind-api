const authService = require("../services/auth.service");
const genToken = require("../utils/genToken");

class AuthController{
    async login(req, res){
       try {
            let {email, password} = req.body;

            const result = await authService.login(email.trim(), password);

            if(result.status){
                res.status(result.statusCode).json({status: result.status, token: result.token})
            }else{
                res.status(result.statusCode).json({status: result.status, message: result.message})
            }
       } catch (error) {
            console.log("Erro inesperado "+error);
            res.status(500).json({message: "Erro interno no servidor"})
       }
    }

    async oAuth(req, res){
        const user = req.user;        
        const token = await genToken(user, "2h");
    
        res.status(200).json({token})
    }
}

module.exports = new AuthController()