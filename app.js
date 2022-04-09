const express = require('express');

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

//importação dos Controllers
const usuarioController = require("./clm/usuario/UsuarioController");
const alunoController = require("./clm/aluno/AlunoController");
const cursoController = require("./clm/curso/CursoController");
const turmaController = require("./clm/turma/TurmaController");
const professorController = require("./clm/professor/ProfessorController")
const semestreController = require("./clm/semestre/SemestreController")



//Incluir as Models
const usuarioModel = require('./clm/usuario/UsuarioModel');
const alunoModel   = require("./clm/aluno/AlunoModel");
const cursoModel = require("./clm/curso/CursoModel");
const turmaModel = require("./clm/turma/TurmaModel");


app.use(express.json());

//utilizar os Controllers
app.use("/", usuarioController);
app.use("/", alunoController);
app.use("/", cursoController);
app.use("/", turmaController);
app.use("/", professorController);
app.use("/",semestreController);



app.listen(8002, (error) => {
  if (error) {
    console.log("Problema ao iniciar servidor")
  } else {
    console.log("Servidor Rodando na porta 8002!!")
  }
});