const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post'); 
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

router.post('/',auth,multer.single("image"),postCtrl.createPost);
router.put('/:id', auth,multer.single("image"), postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post("/:id/like", auth, postCtrl.likeAndDislike)

module.exports = router;
