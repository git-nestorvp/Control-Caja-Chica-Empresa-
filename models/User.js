const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['admin'], default: 'admin' }
});

// Hashea contraseña automáticamente
UserSchema.pre('save', async function (next) {
    if (!this.isModified('contraseña')) return next();
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
});

UserSchema.methods.compararContraseña = async function (input) {
    return await bcrypt.compare(input, this.contraseña);
};

module.exports = mongoose.model('User', UserSchema);