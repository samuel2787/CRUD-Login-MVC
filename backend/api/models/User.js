const bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    username: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
  },

  // antes de guardar, encripta la contraseña
  beforeCreate: async function (values, proceed) {
    values.password = await bcrypt.hash(values.password, 10);
    return proceed();
  },
};
