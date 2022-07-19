const mongoose = require('mongoose');
// Le middleware "UniqueValidator" verifie l'unicité de l'adresse mail par compte
const uniqueValidator = require('mongoose-unique-validator');

// Création du shéma "user" pour la BDD MongoDB
const userSchema = mongoose.Schema({ 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
});

// Permet d'appliquer le middleware "UniqueValidator" au shéma "user"
userSchema.plugin(uniqueValidator);
// puis l'exporter pour le rendre utilisable dans d'autres fichiers
module.exports = mongoose.model('User', userSchema);