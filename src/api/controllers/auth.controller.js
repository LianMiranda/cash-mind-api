const authService = require("../services/auth.service");

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
}

module.exports = new AuthController()