const usuarioModel = require('../model/usuarioModel.js');
const enderecoModel = require('../model/enderecoModel.js'); // Importe o enderecoModel
const { setToken } = require('../util/token.js');


exports.criarUsuario = async (req, res) => {
  const { nome, cpf, dataNascimento, endereco, email, senha } = req.body;

  // Checar se todos os dados necessários estão presentes
  if (!nome || !cpf || !dataNascimento || !endereco || !email || !senha) {
    return res.status(400).send('Dados incompletos');
  }

  // Verifique se o usuário já existe pelo CPF
  const usuarioPeloCPF = await usuarioModel.usuarioPeloCPF(cpf);

  if (usuarioPeloCPF) {
    return res.status(400).send('Usuário já cadastrado!');
  }

  // Crie o novo usuário
  const criaNovoUsuario = await usuarioModel.criaNovoUsuario(nome, cpf, dataNascimento, endereco, email, senha);

  // Gere um novo token para o usuário criado usando o ID
  const token = await setToken(criaNovoUsuario);
  return res.status(200).json({ message: 'Usuário cadastrado!', token });
};

exports.editarUsuario = async (req, res) => {
  const { id, nome, cpf, dataNascimento, endereco, email, senha } = req.body;

  if (!id || !nome || !cpf || !dataNascimento || !endereco || !email || !senha) {
    return res.status(400).send('Dados incompletos');
  }

  const usuarioExistente = await usuarioModel.usuarioPorId(id); // Você precisa implementar essa função no modelo.

  if (!usuarioExistente) {
    return res.status(404).send('Usuário não encontrado');
  }

  await usuarioModel.atualizaUsuario(id, nome, cpf, dataNascimento, endereco, email, senha); // Você precisa implementar essa função no modelo.
  return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
};

exports.excluirUsuario = async (req, res) => {
  const { id } = req.params; // Espera que o ID do usuário seja passado na URL

  if (!id) {
    return res.status(400).send('ID do usuário é necessário');
  }

  const usuarioExistente = await usuarioModel.usuarioPorId(id);

  if (!usuarioExistente) {
    return res.status(404).send('Usuário não encontrado');
  }

  await usuarioModel.excluirUsuario(id); // Você precisa implementar essa função no modelo.
  return res.status(200).json({ message: 'Usuário excluído com sucesso' });
};

exports.listarUsuarios = async (req, res) => {
  const usuarios = await usuarioModel.listarUsuarios(); // Você precisa implementar essa função no modelo.
  return res.status(200).json(usuarios);
};
