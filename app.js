const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {eAdmin} = require("./middlewares/Authorization");
require('dotenv').config(); //VARIAVEL GLOBAL 

//permitir acesso a api
var cors  = require('cors');
const app = express();



app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', ' X-PINGOTHER , Content-Type, Authorization');
  app.use(cors());
  next();
})




//Incluir as Models
const UsuarioModel = require('./usuario/UsuarioModel');


app.use(express.json());



app.get('/teste', (req, res) => {
  res.send('Pagina Inicial')
})

// usuario

//visualizar usuarios
app.get('/userView',eAdmin,  (req, res) => {

  UsuarioModel.findAll({

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
app.get('/userView/:id', eAdmin, async (req, res) => {
  const { id } = req.params;
  //await UsuarioModel.findAll({where:{id:id}})
  await UsuarioModel.findByPk(id)

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



app.post('/cadUsuario', eAdmin, async (req, res) => {
  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 10)

  await UsuarioModel.create(dados)
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
app.put("/editUsuario", eAdmin,async (req, res) => {
  const { id } = req.body;

  await UsuarioModel.update(req.body, { where: { id } })
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
app.delete("/delUsuario/:id",eAdmin, async (req, res) => {
  const { id } = req.params;

  await UsuarioModel.destroy({ where: { id } })
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
app.put("/editUsuario-password", eAdmin,async (req, res) => {
  const { id, password } = req.body;
  var senhaCrypt = await bcrypt.hash(password, 10)
  await UsuarioModel.update({ password: senhaCrypt }, { where: { id } })
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
app.post("/login", async (req, res) => {

//função que ativa o loading no login(front) 
await sleep(1000)
  function sleep(ms){
    return new Promise((resolve)=>{
      setTimeout(resolve, ms)
    })
  }


  const usuario = await UsuarioModel.findOne({
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

app.get('/val-token', eAdmin, async (req,res)=>{

  await UsuarioModel.findAll(req.usuarioId, {attributes:[ 'id', 'nome','usuario']})
  //await UsuarioModel.findAll(req.usuarioId)
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

app.listen(8002, (error) => {
  if (error) {
    console.log("Problema ao iniciar servidor")
  } else {
    console.log("Servidor Rodando na porta 8002!!")
  }
});