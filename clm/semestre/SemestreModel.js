const Sequelize = require("sequelize");
const db = require("../../database/db");


const Semestre = db.define('tbSemestre',{
    codSemestre:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    semestre:{
        type:Sequelize.STRING
    }
})

    // Semestre.sync({alter:true}).then(()=>{
    //     console.log('Tabela TbSemestre criada com Sucesso!!')
    // }).catch((err)=>{
    //     console.log('Erro ao criar a tabela' +  err.message)
    // })


module.exports = Semestre;

