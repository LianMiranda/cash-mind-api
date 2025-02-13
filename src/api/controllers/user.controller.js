const userService = require("../services/user.service")
const express = require('express');

class UserController {
    async create(req,res){
        try{
            let {email, password, firstName, lastName, cpf} = req.body;
            const result = await userService.create(email, password, firstName, lastName, cpf);

            if(result.status){
                return res.status(201).json(result);
            }

        }catch(error){
            const statusCode = error.statusCode;
            console.log("ERRO: "+error.message);
            return res.status(statusCode).json({status: false, error: error.message})
        } 
    }

    async findAll(req, res){
        try {
            const result = await userService.find();

            if(result.status){
                return res.status(200).json({status: result.status, message: result.message, result: result.user});
            }else{
                return res.json(400).json({status: result.status, message: result.message})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async findById(req, res){
        try {
            let id = req.params.id
            const result = await userService.findById(id);

           if(result.status){
                return res.status(200).json({status: result.status, message: result.message, result: result.user});
            }else{
                return res.status(400).json({status: result.status, message: result.message})
            }

        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async findByEmail(req, res){
        try {
            let email = req.params.email
            const result = await userService.findByEmail(email);

           if(result.status){
                return res.status(200).json({status: result.status, message: result.message, result: result.user});
            }else{
                return res.status(400).json({status: result.status, message: result.message})
            }

        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async update(req, res){
        try {
            const {email, newPassword, actualPassword, firstName, lastName, cpf} = req.body
            let id = req.params.id;
            
            const result = await userService.update(id, email, newPassword, actualPassword, firstName, lastName, cpf);
            
            if(result.status){
                return res.status(200).json({status: result.status, message: result.message, result: result.user});
            }else{
                return res.status(400).json({status: result.status, message: result.message})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async delete(req, res){
        try {
            let id = req.params.id;
            const result = await userService.delete(id);

            if(result.status){
                return res.status(200).json({status: result.status, message: result.message});
            }else{
                return res.status(400).json({status: result.status, message: result.message})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }
}

module.exports = new UserController()