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

                  
        }catch(error){
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async find(req, res){
        try {
            const result = await transactionService.find();

            if(result.status){
                res.status(result.statusCode).json({status: result.status, message: result.message, transactions: result.transactions})
            }else{
                res.status(result.statusCode).json({status: result.status, message: result.message});  
            }       
        }catch(error){
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }
    
    async findById(req, res){
        try {
            const id = req.params.id;

            const result = await transactionService.findById(id);

            if(result.status){
                res.status(result.statusCode).json({status: result.status, message: result.message, transaction: result.transaction})
            }else{
                res.status(result.statusCode).json({status: result.status, message: result.message});  
            }
        }catch(error){
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }
    async update(req, res){
        try {
            const id = req.params.id;
            const {type, category, date, price, userId}= req.body;

            const result = await transactionService.update(id, type, category, date, price);

            if(result.status){
                res.status(result.statusCode).json({status: result.status, message: result.message, transaction: result.transaction})
            }else{
                res.status(result.statusCode).json({status: result.status, message: result.message})
            }
        }catch(error){
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }
    async delete(req, res){
        try {
            const id = req.params.id;

            const result = await transactionService.delete(id);

            if(result.status){
                res.status(result.statusCode).json({status: result.status, message: result.message, transaction: result.transaction})
            }else{
                res.status(result.statusCode).json({status: result.status, message: result.message});
            }          
        }catch(error){
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }
}

module.exports = new transactionController()