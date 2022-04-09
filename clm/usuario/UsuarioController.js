const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {eAdmin}  = require("../../middlewares/Authorization")

const bcrypt = require('bcrypt');

const usuarioModel = require("./UsuarioModel");

//visualizar usuarios
router.get('/userView',eAdmin,  (req, res) => {

    usuarioModel.findAll({
  
      attributes: ['id', 'nome', 'usuario', 'password'],
      order: [['id', 'DESC']]
    })
  
      .then((usuarios) => {
        return res.json({
          erro: false,
          usuarios
        })
  
      }).catch(() => {
        return res.status(400).json({
          erro: true,
          message: "Erro ao visualizar dados"
        })
  
      })
  })
  
  //visualizar um unico usuario 
  router.get('/userView/:id', eAdmin, async (req, res) => {
    const { id } = req.params;
    //await usuarioModel.findAll({where:{id:id}})
    await usuarioModel.findByPk(id)
  
      .then((usuario) => {
        return res.json({
          erro: false,
          usuario: usuario
        })
      }).catch(() => {
        return res.status(400).json({
          erro: true,
          message: "nenhum usuario encontrado"
        })
      })
  })
  
  
  
  router.post('/cadUsuario', eAdmin, async (req, res) => {
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 10)
  
    await usuarioModel.create(dados)
      .then(() => {
        return res.json({
          erro: false,
          message: "Usuario cadastrado com sucesso"
        })
      }).catch((e) => {
        //console.log("Erro ao cadastrar usuario " + e)
        return res.status(400).json({
          erro: true,
          message: "Erro ao cadastrar Usuario"
        })
      })
  })
  
  
  //Editar PUT
  
  //obs: Não manda o id na requisição
  router.put("/editUsuario", eAdmin,async (req, res) => {
    const { id } = req.body;
  
    await usuarioModel.update(req.body, { where: { id } })
      .then(() => {
        return res.json({
          erro: false,
          message: "Usuario editado com sucesso"
        })
      })
    return res.json({
      erro: false,
      message: "Usuario não cadastrado"
    })
  })
  
  //deletar
  router.delete("/delUsuario/:id",eAdmin, async (req, res) => {
    const { id } = req.params;
  
    await usuarioModel.destroy({ where: { id } })
      .then(() => {
        return res.json({
          erro: false,
          message: "Usuario excluido com sucesso!!"
  
        })
      }).catch(() => {
        return res.status(400).json({
          erro: true,
          message: "Não foi possivel excluir o registro"
        })
      })
  
  })
  
  // a ediçao de senha foi criada em um rota específica
  router.put("/editUsuario-password", eAdmin,async (req, res) => {
    const { id, password } = req.body;
    var senhaCrypt = await bcrypt.hash(password, 10)
    await usuarioModel.update({ password: senhaCrypt }, { where: { id } })
      .then(() => {
        return res.json({
          erro: false,
          message: "Senha do Usuario editada com sucesso"
        })
      })
    return res.json({
      erro: false,
      message: "Erro ao editar a senha"
    })
  })
  
  //Rota Login
  router.post("/login", async (req, res) => {
  
  //função que ativa o loading no login(front) 
  await sleep(1000)
    function sleep(ms){
      return new Promise((resolve)=>{
        setTimeout(resolve, ms)
      })
    }
  
  
    const usuario = await usuarioModel.findOne({
      attributes: ["usuario", "password"],
      where:
      {
        usuario: req.body.usuario
      }
    });
    if (usuario === null) {
      return res.status(400).json({
        erro: true,
        message: "Usuario ou senha Incorreta"
      })
    }
    //compara a senha 
    if (!(await bcrypt.compare(req.body.password, usuario.password))) {
      return res.status(400).json({
        erro: true,
        message: "Usuario ou senha Incorreta"
      })
    }
  
    //retorna um token
    var token = jwt.sign({ id: usuario.id }, process.env.SECRET, { expiresIn: '7d' })
  
  
    return res.json({
      erro: false,
      message: "Logado!!",
      token
    })
  
  })
  
  router.get('/val-token', eAdmin, async (req,res)=>{
  
    await usuarioModel.findAll(req.usuarioId, {attributes:[ 'id', 'nome','usuario']})
    //await usuarioModel.findAll(req.usuarioId)
    .then((user)=>{
      return res.json({
        erro:false,
        user
      })
  
    }).catch(()=>{
      return res.status(400).json({
        erro:true,
        message: " Erro: Necessario realizar o login para acessar a pagina"
      })
    })
  })

  module.exports = router;

