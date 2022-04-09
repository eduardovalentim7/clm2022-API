const express = require("express");
const router = express.Router();

const turmaModel = require("./TurmaModel");

router.get("/viewturma", async (req, res) => {
    await turmaModel.findAll({
        attributes: ['codTurma', 'turma'],
        order: [['codTurma', 'DESC']]

    })
        .then((turma) => {
            return res.json({
                erro: false,
                turma
            })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel exibir o(s) registro(s)"
            })
        })
});

router.get("/viewturma/:codTurma", async (req, res) => {
    var { codTurma } = req.params;
    await turmaModel.findByPk(codTurma)
        .then((turma) => {
            return res.json({
                erro: false,
                turma
            })

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel exibir o registro selecionado"
            })
        })



})


router.post("/cadturma", async (req, res) => {
    var dados = req.body;

    await turmaModel.create(dados)
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


router.put("/editturma", async (req, res) => {
    const { codTurma } = req.body;

    await turmaModel.update(req.body, { where: { codTurma } })
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


router.delete("/delturma/:codTurma", async (req, res) => {
    var { codTurma } = req.params;
    await turmaModel.destroy({ where: { codTurma } })
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

module.exports = router
