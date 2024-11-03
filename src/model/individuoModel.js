const { query } = require('./database');

exports.individuoPeloCPF = async (cpf) => {
    const result = await query(`SELECT * FROM individuo WHERE cpf = ?`, [cpf]);
    return result.length > 0;
};

exports.criaNovoIndividuo = async (cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco) => {
    const novoIndividuo = `
      INSERT INTO individuo (cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(novoIndividuo, [cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco]);
    return result;
};

// individuoModel.js
exports.individuoPorId = async (id) => {
  const individuo = await query('SELECT * FROM individuo WHERE id = ?', [id]);
  return individuo.length > 0 ? individuo[0] : null;
};

exports.atualizaIndividuo = async (id, cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco) => {
  const atualizarIndividuo = `
    UPDATE individuo 
    SET cpf = ?, nome = ?, sobrenome = ?, sexo = ?, dataNascimento = ?, rg = ?, nis = ?, etnia = ?, email = ?, endereco_idendereco = ?
    WHERE id = ?
  `;
  await query(atualizarIndividuo, [cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco, id]);
};

exports.listarIndividuos = async () => {
  return await query('SELECT * FROM individuo');
};

exports.excluirIndividuo = async (id) => {
  await query('DELETE FROM individuo WHERE id = ?', [id]);
};
