const { query } = require('./database')

exports.usuarioPeloCPF = async (CPF) => {
    const usuario = query(
        `SELECT * FROM  usuario WHERE cpf = ${CPF}`
    )

    if (usuario?.lenght > 0) {
        return true;
    }

    return false;
};

exports.criaNovoUsuario = async (nome, cpf, dataNascimento, endereco, email, senha) => {
    const novoUsuario = `
      INSERT INTO usuario (nome, cpf, dataNascimento, endereco_idendereco, email, senha) 
      VALUES ('${nome}', '${cpf}', '${dataNascimento}', '${endereco}', '${email}', '${senha}')
    `;
  
    try {
      const result = await query(novoUsuario);
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao cadastrar usuario: ' + error.message);
    }
};