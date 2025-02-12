const userService = require("../services/user.service")
const express = require('express');


class UserController {
    async create(req,res){
        try{
            let {email, password, firstName, lastName, cpf} = req.body;
            const result = await userService.create(email, password, firstName, lastName, cpf);

            if(result.status){
                return res.status(200).json({status: result.status, message: result.message, user: result.user})
            }else{
                return res.status(400).json({status: result.status, message: result.message})
            }
        }catch(error){
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        } 
    }

    async findAll(req, res){
        try {
            const user = await userService.find();

            if(user.status){
                return res.status(200).json({status: user.status, message: user.message, user: user.user});
            }else{
                return res.json(400).json({status: user.status, message: user.message})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async findById(req, res){
        try {
            let id = req.params.id
            const user = await userService.findById(id);

           if(user.status){
                return res.status(200).json({status: user.status, message: user.message, user: user.user});
            }else{
                return res.status(400).json({status: user.status, message: user.message})
            }

        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async findByEmail(req, res){
        try {
            let email = req.params.email
            const user = await userService.findByEmail(email);

           if(user.status){
                return res.status(200).json({status: user.status, message: user.message, user: user.user});
            }else{
                return res.status(400).json({status: user.status, message: user.message})
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
            
            const user = await userService.update(id, email, newPassword, actualPassword, firstName, lastName, cpf);
            
            if(user.status){
                return res.status(200).json({status: user.status, message: user.message, user: user.user});
            }else{
                return res.status(400).json({status: user.status, message: user.message})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }

    async delete(req, res){
        try {
            let id = req.params.id;
            const deleteUser = await userService.delete(id);

            if(deleteUser.status){
                return res.status(200).json({status: deleteUser.status, message: deleteUser.message});
            }else{
                return res.status(400).json({status: deleteUser.status, message: deleteUser.message})
            }
        } catch (error) {
            console.log("Erro inesperado: "+error);
            return res.status(500).json({error: "Erro interno no servidor"})
        }
    }
}

module.exports = new UserController()