const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);
const sequelize = require('../src/config/database/connection'); 

const userTest = {
    email:"teste@gmail.com", 
    firstName:"Teste", 
    lastName:"da Silva", 
    cpf:"00000000000",
    password: "1234"
}

const userTestAuth = {
    email:"testeAuth@gmail.com", 
    firstName:"Teste Auth", 
    lastName:"da Silva", 
    cpf:"00000000001",
    password: "12345"
}

beforeAll(async () =>{
    try {  
        await sequelize.authenticate();
    } catch (error) {
        console.error("Erro ao conectar banco dados de teste:", error);
    }
})

beforeEach(async () => {
    try {
        await request.post("/api/user").send(userTestAuth);
    } catch (error) {
        console.error("Erro ao criar usuario userTestAuth: "+error);
        
    }
})

afterAll(async () => {
    try {  
        await sequelize.close();
    } catch (error) {
        console.error("Erro ao fechar banco", error);
    }
});

afterEach(async () => {
    try {
        const getUser = await request.get(`/api/user/email/${userTestAuth.email}`);

        if (getUser._body?.result?.id) {
            await request.delete(`/api/user/delete/${getUser._body.result.id}`);
        }
    } catch (error) {
        console.error("Erro ao deletar usuario userTestAuth: "+error);
    }
   
})


describe("User tests", () => {
    it("Deve registrar um usuario com sucesso", async () =>{
        const res = await request.post("/api/user").send(userTest);
        expect(res.statusCode).toEqual(201);
        expect(res._body.user).toHaveProperty("id");
    });
    
    it("Deve impedir a criação de um usuario que já exista", async () => {
        const res = await request.post("/api/user").send(userTest);
        
        expect(res.statusCode).toEqual(409);
        expect(res._body.message).toEqual("Já existe um usuário cadastrado com esse endereço de email")

    })

    it("Deve impedir a criação de um usuário com campo vazio", async () => {
        const res = await request.post("/api/user").send({ 
            email:"", 
            firstName:"Teste", 
            lastName:"da Silva", 
            cpf:"00000000000",
            password: "1234"
        })
        expect(res.statusCode).toEqual(400);
        expect(res._body.message).toEqual("Verifique se todos os campos foram preenchidos")
    });

    
    it("Deve excluir um usuário cadastrado", async () => {
        const getUser = await request.get(`/api/user/email/${userTest.email}`);
        
        const res = await request.delete(`/api/user/delete/${getUser._body.result.id}`);

        expect(res.statusCode).toEqual(200)
    })
})

describe("AUTH", () =>{
    it("Deve permitir que o usuario faça login com sucesso", async () => {
        const res = await request.post("/api/auth/login").send({email: userTestAuth.email, password: userTestAuth.password});
        
        expect(res._body).toHaveProperty("token")
        expect(res.statusCode).toEqual(200);
    });

    it("Deve impedir que o usuario faça login com algum campo vazio", async () =>{
        const res = await request.post("/api/auth/login").send({email: "", password: userTestAuth.password});
        
        expect(res._body.message).toEqual("Verifique se os campos foram digitados corretamente.")
        expect(res.statusCode).toEqual(422);
    })

    it("Deve impedir que o usuario faça login com senha incorreta", async () =>{
        const res = await request.post("/api/auth/login").send({email: userTestAuth.email, password: "000004320"})
        
        expect(res._body.message).toEqual("Credênciais inválidas, verifique se os campos foram preenchidos corretamente")
        expect(res.statusCode).toEqual(400);
    })

    it("Deve impedir que o usuario faça login com email incorreto (inexistente)", async () =>{
        const res = await request.post("/api/auth/login").send({email:`${Date.now()}@gmail.com`, password: userTestAuth.password})
        
        expect(res._body.message).toEqual("Credênciais inválidas, verifique se os campos foram preenchidos corretamente")
        expect(res.statusCode).toEqual(400);
    })
})
