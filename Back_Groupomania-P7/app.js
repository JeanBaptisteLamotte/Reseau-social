// Import de "express" pour utiliser la fonction "router"
const express = require('express');
// Import de "body-parser" pour utiliser le corps de la requete
const bodyParser = require('body-parser');
// On utilise "Path" qui nous aide à obtenir le chemin du serveur
const path = require('path');
// On definie les routes pour utiliser les fichiers routes
const postRoutes = require('./routes/post'); 
const userRoutes = require('./routes/user'); 

//BDD MongoDB
// Import de "mongoose" pour connecter la BDD MongoDB
 const mongoose = require('mongoose');
// On delocalise les variables de connexion a la BDD dans un fichier .env par sécurité
require('dotenv').config();
//Variables dans le fichier .env
const mongo_user = process.env.MONGODB_USER;
const mongo_pwd = process.env.MONGODB_PASSWORD;
const mongo_name = process.env.MONGODB_NAME;
//Connection a la BDD grace a Mongoose
mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_pwd}@${mongo_name}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion réussie à MongoDB!'))
  .catch(() => console.log('Connexion échouée à MongoDB  !'));


//SECURITE
// Import de "rate-limit" qui permet de controler et de gérer les intervales minimum entre chaque invocations
const limiter = require("./middleware/rateLimit"); 
//Le CORS permet de prendre en charge des requêtes multi-origines sécurisées et des transferts de données entre des navigateurs et des serveurs web
const cors = require('cors');

//Express permet la creation d'un serveur et d'utiliser "Router" pour créer les routes
const app = express();
app.use(cors());
// Ajoutez l'en-tête "Access-Control-Allow-Origin" pour permettre au frontend d'accéder au serveur.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

// Utilisez le middleware rateLimit pour limiter le nombre de requêtes par IP
app.use("/api/auth",limiter ); 
// Utilisez le body-parser pour analyser le corps de la demande.
app.use(bodyParser.json());
// Utiliser express.static pour servir les images pre-compressées
app.use('/images', express.static(path.join(__dirname, 'images'))); 

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
// Exporte "app.js" pour s'en servir dans le fichier "server.js"
module.exports = app;





































