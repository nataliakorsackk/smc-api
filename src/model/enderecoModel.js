const { query } = require('./database')

exports.enderecoPeloNumero = async (numero) => {
    const endereco = query(
        `SELECT * FROM  endereco WHERE numero = ${NUMERO}`
    )

    if (endereco?.lenght > 0) {
        return true;
    }

    return false;
};

exports.criaNovoEndereco = async (cep, estado, cidade, bairro, complemento, rua, numero) => {
    const novoEndereco = `
      INSERT INTO endereco (cep, estado, cidade, bairro, complemento, rua, numero) 
      VALUES ('${cep}', '${estado}', '${cidade}', '${bairro}', '${complemento}', '${rua}', '${numero}')
    `;
  
    try {
      const result = await query(novoEndereco);
      return result.insertId;
    } catch (error) {
      throw new Error('Erro ao cadastrar endereço: ' + error.message);
    }
};