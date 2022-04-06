const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

module.exports = {
    eAdmin: async function (req, res, next) {

        //recebe o token
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({
                erro: true,
                message: "Erro: necessário realizar o login para acessar a pagina"

            })
        }



        //separa o bearer
        const [bearer, token] = authHeader.split(' ');
       

        if (!token) {
            return res.status(400).json({
                erro: true,
                message: "Erro: necessário realizar o login para acessar a pagina"

            })
        }
        try {           
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
            console.log(decoded)
            req.usuarioId = decoded.id;

            return next();

        } catch (error) {
            return res.status(400).json({
                erro: true,
                message: "Erro! Token inválido", error
            });
        }
    }
};