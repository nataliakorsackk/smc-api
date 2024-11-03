const { query } = require('./database');

exports.enderecoPeloNumero = async (numero) => {
  const endereco = await query(
    `SELECT * FROM endereco WHERE numero = ?`, [numero]
  );
  return endereco.length > 0 ? endereco : null;
};

exports.criaNovoEndereco = async (cep, estado, cidade, bairro, complemento, rua, numero) => {
  const novoEndereco = `
  INSERT INTO endereco (cep, estado, cidade, bairro, complemento, rua, numero) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  try {
    const result = await query(novoEndereco, [cep, estado, cidade, bairro, complemento, rua, numero]);
    return result.insertId;
  } catch (error) {
    throw new Error('Erro ao cadastrar endereço: ' + error.message);
  }
};

// enderecoModel.js
exports.enderecoPorId = async (id) => {
  const endereco = await query('SELECT * FROM endereco WHERE id = ?', [id]);
  return endereco.length > 0 ? endereco[0] : null;
};

exports.atualizaEndereco = async (id, cep, estado, cidade, bairro, complemento, rua, numero) => {
  const atualizarEndereco = `
    UPDATE endereco 
    SET cep = ?, estado = ?, cidade = ?, bairro = ?, complemento = ?, rua = ?, numero = ?
    WHERE id = ?
  `;
  await query(atualizarEndereco, [cep, estado, cidade, bairro, complemento, rua, numero, id]);
};

exports.excluirEndereco = async (id) => {
  await query('DELETE FROM endereco WHERE id = ?', [id]);
};
