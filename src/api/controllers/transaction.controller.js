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

    async findByDate(req, res){
        try {
            const userId = req.params.userId;
            const date = req.body.date

            const result = await transactionService.findByDate(userId, date);

            console.log(result);
            

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

    async findByCategory(req, res){
        try {
            const userId = req.params.userId;
            const category = req.body.category

            const result = await transactionService.findByCategory(userId, category);

            console.log(result);
            

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

    async findByType(req, res){
        try {
            const userId = req.params.userId;
            const type = req.body.type

            const result = await transactionService.findByType(userId, type);

            console.log(result);
            

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
     
}

module.exports = new transactionController()