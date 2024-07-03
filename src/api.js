var express = require("express");
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use('/', router.get('/', (req, res)=>{
    res.status(200).send("<h1>Sistema de Monitoramento de Calamidade</h1>")
}))

app.use('/', router.get("/sobre", (req, res, next) =>{
    res.status(200).send({
        "nome": "smc api",
        "versao": "0.1.0",
        "autor": "Laura e Natália"
    })
}))


app.use('/', router.get("/pessoa", (req, res, next) =>{
    res.status(200).send({
        "nome": "Natália",
        "CPF": "055.106.690-39",
        "dataNascimento": "07/01/2007",
        "email": "nataliakorsack@gmail.com",
        "telefone": "51 994153084",
        "nis": "083745668238",
        "senha": "1913200704"
    })
}))
app.use('/', router.post("/cadastrar", (req, res, next) => {
    try {
      const { nome, dataNascimento, cpf, email, telefone, senha } = req.body;
  
      if (!nome ||!dataNascimento ||!cpf ||!email ||!telefone ||!senha) {
        return res.status(400).send({ message: "Dados incompletos" });
      }
  
      const usuario = {
        nome,
        dataNascimento,
        cpf,
        email,
        telefone,
        senha
      };
  
      res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Erro ao cadastrar usuário" });
    }
  }));



app.use('/', router.post('/beneficiarios', (req, res) => {
  const { nome, cpf, dataNascimento, endereco, cidade, estado } = req.body;
  if (!nome ||!cpf ||!dataNascimento ||!endereco ||!cidade ||!estado) {
    return res.status(400).send('Dados incompletos');
  }
  const beneficiario = { 
    nome, 
    cpf, 
    dataNascimento, 
    endereco, 
    cidade, 
    estado };

    beneficiarios.push(beneficiario);
    res.status(201).send(`Beneficiário cadastrado com sucesso!`);
}));

app.use('/', router.get('/beneficiarios', (req, res, next) => {
  res.status(200).send({
    beneficiario : nome, cpf, dataNascimento, endereco, cidade, estado
  })
}));


module.exports = app; 