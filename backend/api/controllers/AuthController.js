const bcrypt = require('bcryptjs');

module.exports = {
  // crear usuario
  register: async function (req, res) {
    const { username, password } = req.body;
    await User.create({ username, password });
    return res.json({ mensaje: 'Usuario creado' });
  },

  // iniciar sesión
  login: async function (req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Datos incorrectos' });

    const coincide = await bcrypt.compare(password, user.password);
    if (!coincide) return res.status(401).json({ error: 'Datos incorrectos' });

    req.session.userId = user.id; // aquí "recuerda" al usuario
    return res.json({ mensaje: 'Login correcto' });
  },

  // cerrar sesión
  logout: function (req, res) {
    req.session.userId = null;
    return res.json({ mensaje: 'Sesión cerrada' });
  },

  // para que React sepa si hay sesión
  me: function (req, res) {
    return res.json({ logueado: !!req.session.userId });
  },
};
