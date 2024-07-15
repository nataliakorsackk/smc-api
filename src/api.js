const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 

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
const pessoal = [];  
app.use('/', router.get("/pessoas", (req, res, next) =>{
  
    res.status(200).json({ pessoal: pessoal.map((pessoa) => ({
       nome: pessoa.nome, 
       cpf: pessoa.cpf,
       email: pessoa.email,
       telefone:pessoa.telefone,
       senha: pessoa.senha
      })
   )})
})); 

const autenticacao = (req, res, next) => {  
  const token = req.header('Autorizado');  
  if (!token) {  
    return res.status(401).send('Nenhum token');  
  }  
  jwt.verify(token, 'ecretKey', (err, decoded) => {  
    if (err) {  
      return res.status(401).send('token inválido');  
    }  
    if (decoded.role!== 'ROLE_PERSONNEL') {  
      return res.status(403).send('Não autorizado');  
    }  
    next();  
  });  
};  

app.use('/', router.post("/pessoa", (req, res, next) => {
    try {
      const { nome, dataNascimento, cpf, email, telefone, senha, id } = req.body;
  
      if (!nome ||!dataNascimento ||!cpf ||!email ||!telefone ||!senha || !id) {
        return res.status(400).send({ message: "Dados incompletos" });
      }
  
      const usuario = {
         nome, dataNascimento, cpf, email, telefone, senha, id
        
      };
        pessoal.push(usuario); 

      res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Erro ao cadastrar usuário" });
    }
  }));
  app.patch('/pessoa', (req, res) => {  
    const id = req.params.id;  
    const pessoa = pessoal.find((p) => p.id === id);  
    if (!pessoa) {  
      return res.status(404).send({ message: "Pessoa não encontrada" });  
    }  
    pessoa.role = 'ADMIN';  
    res.status(200).send({ message: "Pessoa promovida a admin com sucesso!" });  
  });  


  const usuarios = []; 
app.use('/', router.post('/beneficiarios', autenticacao, (req, res) => {
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

    usuarios.push(beneficiario);
    res.status(201).send(`Beneficiário cadastrado com sucesso!`);
}));

app.use('/', router.get('/beneficiarios', (req, res, next) => {  
  res.status(200).json({ beneficiarios: beneficiarios.map((beneficiario) => ({ 
    nome: beneficiario.nome, 
    cpf: beneficiario.cpf,
    dataNascimento: beneficiario.dataNascimento, 
    endereco: beneficiario.endereco, 
    cidade: beneficiario.cidade, 
    estado: beneficiario.estado
  })) 
  });  
})); 


app.post('/login', (req, res) => {  
  const { cpf, senha } = req.body;  
  if (cpf === 'admin' && senha === 'senha') {  
    const token = jwt.sign({ role: 'ROLE_PERSONNEL' }, 'ecretKey');  
    res.json({ token });  
  } else {  
    res.status(401).send('Invalid credentials');  
  }  
});  
  
module.exports = app; 