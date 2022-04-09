const Sequelize = require("sequelize");
const db = require("../../database/db");

const Curso = db.define('tbCurso', {
    codCurso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    curso: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

// Curso.sync({alter:true}).then(()=>{
//     console.log('Tabela TbCurso criada com Sucesso!!')
// }).catch((err)=>{
//     console.log('Erro ao criar a tabela' +  err.message)
// })


module.exports = Curso;