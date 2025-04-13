const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { dbName: 'caja_chica' })
  .then(async () => {
    const usuarios = [
      { nombre: 'Nestor', correo: 'nestor@empresa.com', contraseña: '123456' },
      { nombre: 'Gisela', correo: 'gisela@empresa.com', contraseña: '123456' }
    ];

    for (const datos of usuarios) {
      const existente = await User.findOne({ correo: datos.correo });
      if (!existente) {
        const nuevo = new User(datos); // Se hashea automáticamente en el modelo
        await nuevo.save();
        console.log(`✅ Usuario creado: ${datos.nombre}`);
      } else {
        console.log(`ℹ️ El usuario ${datos.nombre} ya existe`);
      }
    }

    console.log('✅ Seed completado.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error al hacer seed:', err);
    process.exit(1);
  });