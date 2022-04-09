const express = require("express");
const router = express.Router();


const semestreModel = require("./SemestreModel");



router.get("/viewsemestre", async (req,res)=>{
    await semestreModel.findAll({
        attributes:['codSemestre','semestre'],
        order:[['codSemestre','DESC']]
    })
    .then((semestres)=>{
        return res.json({
            erro:false,
            semestres
        })
    }).catch((err)=>{
        console.log("O Erro foi " + err)
        // return res.status(400).json({
        //     erro: true,
        //     message: "Nao foi possivel exibir o(s) registro(s)"
        // })
    })

});

router.get("/viewsemestre/:codSemestre", async (req,res)=>{
    const {codSemestre} = req.params;
    await semestreModel.findByPk(codSemestre)
    .then((semestre)=>{
        return res.json({
            erro:false,
            semestre
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            message: "Nao foi possivel exibir o(s) registro(s)"
        })
    })

});

router.post("/cadsemestre", async (req,res)=>{
    const dados = req.body;
    await semestreModel.create(dados)
    .then(()=>{
        return res.json({
            erro:false,
            message:"Registro cadastrado com Sucesso"
        })

    }).catch(()=>{
        return res.status(400).json({
            erro:true,
            message:"Nao foi possivel realizar o cadastro"
        })
    })    
})

router.put("/editsemestre",async (req,res)=>{
    const {codSemestre} = req.body;
    await semestreModel.update(req.body,{where:{codSemestre}})
    .then(() => {
        return res.json({
            erro: false,
            message: "Registro alterado com sucesso!"
        })

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            message: "Nao foi possivel alterar o registro"
        })
    })
})

router.delete("/delsemestre/:codSemestre", async (req,res)=>{
    const {codSemestre} = req.params;
    await semestreModel.destroy({where:{codSemestre}})
    .then(() => {
        return res.json({
            erro: false,
            message: "Registro excluido com sucesso"
        })

    }).catch(() => {
        return res.status(400).json({
            erro: true,
            message: "Nao foi possivel excluir o registro"
        })
    })
})


module.exports = router;