const express = require("express");
const router = express.Router();

const professorModel = require("./ProfessorModel")

router.get("/viewprofessor", async (req, res) => {
    await professorModel.findAll({
        attibutes: ['codProfessor', 'nome'],
        order: [['codProfessor', 'DESC']]
    })
        .then((professor) => {
            return res.json({
                erro: false,
                professor
            })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel exibir o(s) registro(s)"
            })
        })

});

router.get("/viewprofessor/:codProfessor", async (req, res) => {
    const { codProfessor } = req.params;
    await professorModel.findByPk(codProfessor)
        .then((professor) => {
            return res.json({
                erro: false,
                professor
            })

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel exibir o registro selecionado"
            })
        })
})


router.post("/cadprofessor", async (req, res) => {
    const dados = req.body;
    await professorModel.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                message: "Registro cadastrado com Sucesso"
            })

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel realizar o cadastro"
            })
        })
})

router.put("/editprofessor", async (req, res) => {
    const { codProfessor } = req.body;
    await professorModel.update(req.body, { where: { codProfessor } })
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

router.delete("/delprofessor", async (req, res) => {
    var { codProfessor } = req.params;
    await professorModel.destroy({ where: { codProfessor } })
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