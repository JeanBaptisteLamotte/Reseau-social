const jwt = require('jsonwebtoken');// Jwt créer un Token pour le client et lui envoie
require('dotenv').config(); // Dotenv est un module qui nous permet de lire les variables d'environnement à partir d'un fichier .env.

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_PWD);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            
            next();
        }
    }
    catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
};