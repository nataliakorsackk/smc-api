const { checkToken } = require('../util/token');

module.exports = async function (req, res, next) {
  if (req.originalUrl !== '/usuarios' && req.originalUrl !== '/endereco' && req.originalUrl !== '/sobre') {
  if (!req.header('token') || !req.header('idUsuario') || req.header('idEndereco')) {
    return res.status(400).json({ auth: false, message: 'Token ou ID do usuário e/ou endereço ausente.' });
  }
    const { auth, message } = await checkToken(req.header('token'), req.header('idUsuario'), req.header('idEndereco'));

    if (!auth) {
      return res.status(401).json({ auth, message });
    }
  }

  next();
};
