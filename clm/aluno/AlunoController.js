const express = require("express");
const router = express.Router();
//const {eAdmin} = require("../../middlewares/Authorization");

const alunoModel = require("./AlunoModel");

router.get("/listAluno", async (req, res) => {
    alunoModel.findAll({
        attributes: ['matricula', 'nome'],
        order: [['matricula', 'DESC']]
    })
        .then((alunos) => {
            return res.json({
                erro: false,
                alunos
            })

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel visualizar os dados"
            })

        })
})

router.get("/listAluno/:matricula", async (req, res) => {
    const { matricula } = req.params;
    await alunoModel.findByPk(matricula)
        .then((aluno) => {
            return res.json({
                erro: false,
                aluno
            })

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                messagem: "Nao foi possivel visualizar os dados"
            })
        })
    })



router.post("/cadAluno", async (req, res) => {
    var dados = req.body;
    await alunoModel.create(dados)
        .then(() => {
            return res.json({
                erro: false,
                message: "Aluno cadastrado com sucesso!!"
            })

        }).catch((err) => {
            return res.status(400).json({
                erro: true,
                message: "Nao foi possivel realizar o cadastro"

            })
        })
    })


router.put("/editAluno", async (req, res) => {
    const { matricula } = req.body;

    await alunoModel.update(req.body, { where: { matricula } })
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

router.delete("/delAluno/:matricula", async (req, res) => {
    const { matricula } = req.params;

    await alunoModel.destroy({ where: { matricula } })
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