const { v4 } = require("uuid");
const Transaction = require("../models/Transaction");
const { expenseCategories, revenueCategories } = require("../../config/transactionConfig/categories");
const { Sequelize, fn, Op, col } = require("sequelize");

class transactionService{
    async create(type, category, date, price, userId){
        if(!type || !category || !date || !price || !userId){
            return{status:false, message: "Verifique se todos os campos foram preenchidos", statusCode: 400};
        }

        let categories = [];
        
        if(type == "DESPESA"){
            categories = expenseCategories;
        }else if(type == "RECEITA"){
            categories = revenueCategories
        }else{
            return{status: false, message: "Tipo de transação inválido", statusCode: 400};
        }
            
        try {          
            if(categories.indexOf(category) != -1){
                const id = v4();        
                const transaction = await Transaction.create({id, type, category, date, price, userId});
    
                if(!transaction){
                    return{status: false, message: "Erro ao criar transação", statusCode: 400};
                }
    
                return{status: true, message: "Transação criada com sucesso", statusCode: 201, transaction};
            }

            return{status: false, message: `As categorias para o tipo ${type} são: ${categories}`, statusCode: 400};
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao criar transação", statusCode: 500};
        }
    }

    async find(){
        try {
            const transactions = await Transaction.findAll({
                attributes: ["type", "category", "date", "price"]
            });

            if(transactions.length === 0){
                return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
            }

            return{status: true, message: "Transações encontradas", statusCode: 200, transactions: transactions}; 

        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar transação", statusCode: 500};

        }
       
    }
    async findById(id){
        try {
            const transaction = await Transaction.findOne({where: {id},
                    attributes: ["type", "category", "date", "price"]
            });

            if(!transaction){
                return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
            }

            return{status: true, message: `Transação com ${id} encontrada`, statusCode: 200, transaction}; 
            
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar transação", statusCode: 500};

        }
    }

    async findByUserId(id){
        try {
            const transaction = await Transaction.findAll({where: {userId: id},
                attributes: ["type", "category", "date", "price"]
            });

            if(!transaction){
                return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
            }

            return{status: true, message: `Transação com ${id} encontrada`, statusCode: 200, transaction}; 
            
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar transação", statusCode: 500};

        }
    }

    async update(id, type, category, date, price){
        const userExists = await this.findById(id);

        if(!userExists.status){
            return{status: false, message: `Transação não encontrada`, statusCode: 404};
        }

        let updateTransaction = {};
        let categories = []

        if(type) updateTransaction.type = type;

        if(category){
            if(updateTransaction.type == "DESPESA"){
                categories = expenseCategories;
            }else{
                 categories = revenueCategories;
            }

            if(categories.indexOf(category) != -1){ 
                updateTransaction.category = category;  
            }else{
                 return{status: false, message: `As categorias para o tipo ${type} são: ${categories}`, statusCode: 400};
            }
        }

        if(date) updateTransaction.date = date;
        if(price) updateTransaction.price = price;

        try {
                const transaction = await Transaction.update(updateTransaction, {where: {id}});
    
                if(transaction < 1){
                    return{status: false, message: "Erro ao criar transação", statusCode: 400};
                }
    
                return{status: true, message: "Transação atualizada com sucesso", statusCode: 201, transaction};
            

        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar transação", statusCode: 500};
        }
    }

    async delete(id){
        try {
            const idExists = await this.findById(id);
            if(idExists.status){
                await Transaction.destroy({where: {id}}); 
                return{status: true, message: `Transação com id ${id} excluida com sucesso!`, statusCode: 200}
            }

            return{status: false, message: `Transação não encontrada`, statusCode: 404};
        } catch (error) {
            console.log(error);
            return{status: false, message: "Erro inesperado ao buscar transação", statusCode: 500};
        }
    }

    async findByDate(userId, date){
        const transactions = await Transaction.findAll({
            where:{
                date: date,
                userId: userId,
            },
            attributes: ["type", "category", "date", "price"]
        });
        
        if(transactions.length === 0){
            return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
        }

        return{status: true, message: "Transações encontradas", statusCode: 200, transactions: transactions}; 
    }

    async findByCategory(userId, category){
        const transactions = await Transaction.findAll({
            where:{
                category: category,
                userId: userId,
            },
            attributes: ["type", "category", "date", "price"]
        });
        
        if(transactions.length === 0){
            return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
        }

        return{status: true, message: "Transações encontradas", statusCode: 200, transactions: transactions}; 
    }
    
    async findByType(userId, type){
        const transactions = await Transaction.findAll({
            where:{
                type: type,
                userId: userId,
            },
            attributes: ["type", "category", "date", "price"]

        });
        
        if(transactions.length === 0){
            return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
        }

        return{status: true, message: "Transações encontradas", statusCode: 200, transactions: transactions}; 
    }

    async findByMonth(userId, mouth, year){
        const transactions = await Transaction.findAll({
            where:{
                userId: userId,
                [Op.and]: [
                    Sequelize.where(fn("MONTH", col("date")), mouth),
                    Sequelize.where(fn("YEAR", col("date")), year),
                ]
            },
            attributes: ["type", "category", "date", "price"],
            order:[ 
                ['type', "DESC"],
            ]
        });
        
        if(transactions.length === 0){
            return{status: false, message: "Nenhuma transação encontrada", statusCode: 404};
        }

        return{status: true, message: "Transações encontradas", statusCode: 200, transactions: transactions}; 
    }
}

module.exports = new transactionService()