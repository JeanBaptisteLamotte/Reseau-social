
const mongoose = require('mongoose');

// Création du shéma "post" pour la BDD MongoDB
const postSchema = mongoose.Schema({
  userId: {type: String, required: true},
  name: {type: String,required: true},
  date: {type: String,required: true},
  title: {type: String,required: true,trim: true},
  content: {type: String,required: true,trim: true},
  imageUrl: {type: String},
  likes: {type: Number,required: true},
  usersLiked: {type: [String],required: true},
});

// puis l'exporter pour le rendre utilisable dans d'autres fichiers
module.exports = mongoose.model('post', postSchema);