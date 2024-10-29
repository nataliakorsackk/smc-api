const usuarioModel = require('../model/usuarioModel.js');
const { setToken } = require('../util/token.js');

exports.criarUsuario = async (req, res) => {
  const { nome, cpf, dataNascimento, endereco, email, senha } = req.body;
  if (!nome || !cpf || !dataNascimento || !endereco || !email || !senha) {
    return res.status(400).send('Dados incompletos');
  }

  const usuarioPeloCPF = await usuarioModel.usuarioPeloCPF(cpf)

  if (usuarioPeloCPF) {
    return res.status(400).send('Usuario já cadastrado!')
  }

  const criaNovoUsuario = await usuarioModel.criaNovoUsuario(nome, cpf, dataNascimento, endereco, email, senha);

  const token = await setToken(criaNovoUsuario);
  return res.status(200).json({ message: 'Usuário cadastrado!', token });
};
