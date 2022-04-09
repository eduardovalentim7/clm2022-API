const express = require("express");
const router = express.Router();

const cursoModel = require("./CursoModel");

router.get("/viewcurso", async (req,res)=>{
    await cursoModel.findAll({attributes:['codCurso','curso']})
    .then((curso)=>{
        return res.json({
            erro:false,
            curso
        })
    }).catch(()=>{
        return res.status(400).json({
            erro: true,
            message: "Nao foi possivel exibir o(s) registro(s)"
        })
    })
});

router.get("/viewcurso/:codCurso", async (req,res) => {
    const {codCurso}  = req.params;
await cursoModel.findByPk(codCurso)
.then((curso)=>{
    return res.json({
        erro:false,
        curso
    })

}).catch(()=>{
    return res.status(400).json({
        erro: true,
        message:"Nao foi possivel exibir o registro selecionado"
    })
})

})


router.post("/cadcurso", async (req,res)=>{
    var dados = req.body;
    await cursoModel.create(dados)
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

router.put("/editcurso", async (req,res)=>{
    const {codCurso} = req.body;

    await cursoModel.update(req.body,{where:{codCurso}})
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
});

router.delete("/delcurso/:codCurso", async (req,res)=>{
    const {codCurso} = req.params;

    await cursoModel.destroy({where:{codCurso}})
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