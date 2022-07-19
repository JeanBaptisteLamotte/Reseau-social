const rateLimit = require("express-rate-limit");
// le Middleware "Rate-Limit" permet de limiter le nombre de requetes par adresse IP

const limiter = rateLimit({

    windowMs:15* 60 * 1000,  
    max: 150,  // Impose une limite de 150 requetes sur 15 min pour chaque adresse IP
    standardHeaders: true,  // Permet de retourner l'info dans l'en 
    legacyHeaders: false,  // Désactive les en-tête
    handler: (req, res, next) => {
        res.setHeader("Retry-After", 15);
        res.status(429).send("Too Many Requests");
       }
});

module.exports = limiter;