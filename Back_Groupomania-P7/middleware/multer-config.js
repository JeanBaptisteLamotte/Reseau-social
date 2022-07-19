const multer = require('multer');// Importe le middleware de "Multer" pour traiter les telechargements des images.
// Permet de traiter le type de fichier pouvant etre telechargés.
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif'
    
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    }
    ,
    filename: (req, file, cb) => {
        console.log("file.originalname: ",file.originalname)
        const name = file.originalname.split('.')[0];
        const nameFile = name.replace(/\s+/g, '-');
        cb(null, nameFile + Date.now() + '.' + MIME_TYPE[file.mimetype]);//
    }
}
);

module.exports = multer({ storage: storage,  });

