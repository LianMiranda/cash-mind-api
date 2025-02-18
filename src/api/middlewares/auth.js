const jwt = require("jsonwebtoken");
const env = require("../../config/env/env");
const passport = require("passport");


async function verifToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token não fornecido ou inválido" });
        }
            const token = authHeader.split(" ")[1];
            
            const decoded = jwt.verify(token, env.secret);
            req.user = decoded;
            next();
        
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" });
    }
}

module.exports = verifToken;
