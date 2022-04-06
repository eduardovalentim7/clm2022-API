const { Sequelize } = require('sequelize');
require('dotenv').config(); //VARIAVEL GLOBAL 

const sequelize  = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Conexao com BD realizada com sucesso!!')
}).catch((e)=>{
console.log("Erro ao conectar com o Banco de Dados" + e)
})

module.exports = sequelize;