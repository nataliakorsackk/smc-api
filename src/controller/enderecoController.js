const enderecoModel = require('../model/enderecoModel.js');
const { setToken } = require('../util/token.js');

exports.criarEndereco = async (req, res) => {
  const { cep, estado, cidade, bairro, complemento, rua, numero } = req.body;
  if (!cep || !estado || !cidade || !bairro || !complemento || !rua || !numero) {
    return res.status(400).send('Dados incompletos');
  }

  const enderecoPeloNumero = await enderecoModel.enderecoPeloNumero(numero);
  if (enderecoPeloNumero) {
    return res.status(400).send('Endereço já cadastrado!');
  }

  const criaNovoEndereco = await enderecoModel.criaNovoEndereco(cep, estado, cidade, bairro, complemento, rua, numero);
  const token = await setToken(criaNovoEndereco);
  return res.status(200).json({ message: 'Endereço cadastrado!', token });
};

exports.editarEndereco = async (req, res) => {
  const { id, cep, estado, cidade, bairro, complemento, rua, numero } = req.body;

  if (!id || !cep || !estado || !cidade || !bairro || !complemento || !rua || !numero) {
    return res.status(400).send('Dados incompletos');
  }

  const enderecoExistente = await enderecoModel.enderecoPorId(id); // Você precisa implementar essa função no modelo.

  if (!enderecoExistente) {
    return res.status(404).send('Endereço não encontrado');
  }

  await enderecoModel.atualizaEndereco(id, cep, estado, cidade, bairro, complemento, rua, numero); // Você precisa implementar essa função no modelo.
  return res.status(200).json({ message: 'Endereço atualizado com sucesso' });
};

exports.excluirEndereco = async (req, res) => {
  const { id } = req.params; // Espera que o ID do endereço seja passado na URL

  if (!id) {
    return res.status(400).send('ID do endereço é necessário');
  }

  const enderecoExistente = await enderecoModel.enderecoPorId(id);

  if (!enderecoExistente) {
    return res.status(404).send('Endereço não encontrado');
  }

  await enderecoModel.excluirEndereco(id); // Você precisa implementar essa função no modelo.
  return res.status(200).json({ message: 'Endereço excluído com sucesso' });
};
