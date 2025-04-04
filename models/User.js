const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware pour hasher le mot de passe avant de l'enregistrer dans la base de données
userSchema.pre('save', async function (next) {  // Utilisation d'une fonction normale
    if (!this.isModified('password')) {  // 'this' fait maintenant référence au document Mongoose
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Méthode pour comparer le mot de passe en clair avec le mot de passe haché
userSchema.methods.comparePassword = async function (password) {  // Utilisation d'une fonction normale ici aussi
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
