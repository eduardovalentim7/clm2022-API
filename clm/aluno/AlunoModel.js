const Sequelize = require("sequelize");
const db  = require("../../database/db");

const Aluno  = db.define('tbAlunos',{
    matricula:{
        type:Sequelize.STRING,
        primaryKey:true,
        autoIncrement: false
    },
    nome:{
        type:Sequelize.STRING
    }
});

// Aluno.sync({alter:true}).then(()=>{
//     console.log('Tabela TbAlunos criada com Sucesso!!')
// }).catch((err)=>{
//     console.log('Erro ao criar a tabela' +  err.message)
// })


module.exports = Aluno;