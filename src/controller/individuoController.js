const individuoModel = require('../model/individuoModel');

exports.criarIndividuo = async (req, res) => {
    const { cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco } = req.body;
    if (!cpf || !nome || !sobrenome || !sexo || !dataNascimento || !rg || !nis || !etnia || !email || !endereco_idendereco) {
        return res.status(400).send('Dados incompletos');
    }

    const individuoExistente = await individuoModel.individuoPeloCPF(cpf);
    if (individuoExistente) {
        return res.status(409).send('Indivíduo já cadastrado');
    }

    const novoIndividuo = await individuoModel.criaNovoIndividuo(cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco);
    return res.status(201).json({ message: 'Indivíduo cadastrado com sucesso', individuo: novoIndividuo });
};

exports.editarIndividuo = async (req, res) => {
    const { id, cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco } = req.body;
  
    if (!id || !cpf || !nome || !sobrenome || !sexo || !dataNascimento || !rg || !nis || !etnia || !email || !endereco_idendereco) {
      return res.status(400).send('Dados incompletos');
    }
  
    const individuoExistente = await individuoModel.individuoPorId(id); // Você precisa implementar essa função no modelo.
  
    if (!individuoExistente) {
      return res.status(404).send('Indivíduo não encontrado');
    }
  
    await individuoModel.atualizaIndividuo(id, cpf, nome, sobrenome, sexo, dataNascimento, rg, nis, etnia, email, endereco_idendereco); // Você precisa implementar essa função no modelo.
    return res.status(200).json({ message: 'Indivíduo atualizado com sucesso' });
  };

  exports.excluirIndividuo = async (req, res) => {
    const { id } = req.params; // Espera que o ID do indivíduo seja passado na URL
  
    if (!id) {
      return res.status(400).send('ID do indivíduo é necessário');
    }
  
    const individuoExistente = await individuoModel.individuoPorId(id);
  
    if (!individuoExistente) {
      return res.status(404).send('Indivíduo não encontrado');
    }
  
    await individuoModel.excluirIndividuo(id); // Você precisa implementar essa função no modelo.
    return res.status(200).json({ message: 'Indivíduo excluído com sucesso' });
  };

  
  exports.listarIndividuos = async (req, res) => {
    const individuos = await individuoModel.listarIndividuos(); // Você precisa implementar essa função no modelo.
    return res.status(200).json(individuos);
  };
  