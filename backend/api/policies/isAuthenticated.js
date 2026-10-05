module.exports = function (req, res, proceed) {
  if (req.session.userId) {
    return proceed();
  }
  return res.status(401).json({ error: 'Tienes que iniciar sesión' });
};
