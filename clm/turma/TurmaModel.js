const Sequelize = require("sequelize");
const db = require("../../database/db");

const Turma = db.define('tbTurma',{
    codTurma:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    turma:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

// Turma.sync({alter:true}).then(()=>{
//     console.log('Tabela TbTurma criada com Sucesso!!')
// }).catch((err)=>{
//     console.log('Erro ao criar a tabela' +  err.message)
// })



module.exports = Turma