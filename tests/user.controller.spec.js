const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app)

const userTest = {
    email:"teste@gmail.com", 
    firstName:"Teste", 
    lastName:"da Silva", 
    cpf:"00000000000",
    password: "1234"
}

beforeAll(() =>{
    
});

afterAll(async () => {
    const sequelize  = require('../src/config/database/connection'); 
    await sequelize.close();
});

describe("User tests", () => {
    it("Deve registrar um usuario com sucesso", async () =>{
        const res = await request.post("/api/user").send(userTest);
        expect(res.statusCode).toEqual(201);
        expect(res._body.user).toHaveProperty("id");
    });
    
    it("Deve impedir a criação de um usuario que já exista", async () => {
        const res = await request.post("/api/user").send(userTest)
        expect(res.statusCode).toEqual(409);
        expect(res._body.error).toEqual("Já existe um usuário cadastrado com esse endereço de email")

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
        expect(res._body.error).toEqual("Verifique se todos os campos foram preenchidos")
    })
})
