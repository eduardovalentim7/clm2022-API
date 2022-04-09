const Sequelize = require('sequelize')
const db = require('../../database/db');

const Usuario = db.define('tbUsuarios',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull: false
    },
    usuario:{
        type:Sequelize.STRING,
        allowNull: false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }

});

// Usuario.sync({alter:true}).then(()=>{
//     console.log('Tabela Usuarios criada com Sucesso!!')
// }).catch((err)=>{
//     console.log('Erro ao criar a tabela' +  err.message)
// })

module.exports = Usuario;

