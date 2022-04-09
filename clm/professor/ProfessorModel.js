const Sequelize = require("sequelize");
const db = require("../../database/db");

const Professor = db.define('tbProfessor',{
    codProfessor:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true        
    },
    nome:{
        type:Sequelize.STRING
    }
})

// Professor.sync({alter:true}).then(()=>{
//     console.log('Tabela TbProfessor criada com Sucesso!!')
// }).catch((err)=>{
//     console.log('Erro ao criar a tabela' +  err.message)
// })

             
module.exports = Professor;