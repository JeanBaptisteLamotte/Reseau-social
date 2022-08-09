const { check, validationResult } = require('express-validator');
// "Validator" permet de gerer la validation des données cote serveur

// Check et conditions de mail et mdp avec messages
const validate = [
    // adresse mail
    check('email')
        .isEmail()
        .isLength({ min: 5 })
        .withMessage('Votre adresse mail est invalide, veuillez saisir un minimun de 5 caractères')
        .normalizeEmail(),
    check('email')
        .matches(/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)
        .withMessage('Votre adresse mail est invalide'),

    // mdp
    check('password')
        .isLength({ min: 8 })
        .withMessage('Le mot de passe doit contenir au minimum 8 caractères'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        .withMessage('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial (ex: !, @, #, etc.)')
]

const checkValidation = (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
module.exports = { validate, checkValidation };