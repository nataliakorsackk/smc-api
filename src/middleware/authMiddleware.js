const jwt = require('jsonwebtoken');
const TOKEN_KEY = 'SMC_TOKEN_KEY';

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ auth: false, message: 'Token ausente.' });
  }

  jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, message: 'Token inválido.' });
    }
    req.userId = decoded.id;
    next();
  });
};
