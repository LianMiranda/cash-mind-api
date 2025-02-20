const transactionService = require("../services/transaction.service")

class transactionController{
    async create(req, res){
        try {
            const {type, category, date, price, userId}= req.body;

            const result = await transactionService.create(type, category, date, price, userId);

            if(result.status){
                res.status(result.statusCode).json({status: result.status, message: result.message, transaction: result.transaction})
            }else{
                res.status(result.statusCode).json({status: result.status, message: result.message});
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
        
    }
}

module.exports = new transactionController()