const bcrypt = require('bcrypt');// Permet de crypter le mdp
const jwt = require('jsonwebtoken'); // Le middleware JsonWebToken est comme un jeton (carte d'identité) temporaire sur le lequel seras enregistré plusieurs informations permettant au user d'acceder au site sur un temps donné et de maniere sécurisé
const User = require('../models/User'); // fais appel au model "user"


require('dotenv').config(); // exiger dotenv pour la variable env ici token

exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10) // Hash le mdp
    .then(hash => {
      const user = new User({

        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

// Partie connection de l'utilisateur et création d'un Token
exports.login = (req, res, next) => { 

  User.findOne({ email: req.body.email })

    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)// compare le mdp avec le hash grace à "bcrypt"
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          res.status(200).json({

            userId: user._id,
            role: user.role,

            token: jwt.sign( //Creation du Token pour le user
              { userId: user._id, role: user.role },
              process.env.JWT_PWD,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


// /!\ ATTENTION = Bout de code permettant de rapidement supprimer tout les users de la BDD (évite de les supprimer manuelement sur le site MongoDB Atlas)
// User.deleteMany({})
//   .then(() => console.log("Users deleted !"));


