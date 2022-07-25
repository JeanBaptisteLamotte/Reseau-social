const Post = require('../models/Post'); // fais appel au model "post"
const fs = require('fs'); // Pour exécuter une fonction synchroniquement
const User = require('../models/User'); // fais appel au model "user"


// Créer un nouveau "post"
exports.createPost = async (req, res, next) => { // fonction asynchrone

  const newPost = new Post({

    userId: req.body.userId,
    name: req.body.name,
    date: req.body.date,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file !== undefined ? `http://localhost:8080/images/${req.file.filename}` : '',

    likes: 0,
    usersLiked: [],
  })

  try {

    const post = await newPost.save();
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).send(error)
  }
}

// Modification du Post
exports.modifyPost = (req, res, next) => {
  User.findOne({ _id: req.auth.userId })
    .then(user => {
      Post.findOne({ _id: req.params.id })
        .then(post => {

          if (post.userId == user._id || user.role == "admin") {
            const postObject = req.file ?
              {
                title: req.body.title,
                content: req.body.content,
                imageUrl: req.file !== undefined ? `http://localhost:8080/images/${req.file.filename}` : '',
              } : { ...req.body };

            Post.findByIdAndUpdate({ _id: req.params.id }, { ...postObject, })

              .then(post => {

                if (req.file) {
                  const filename = post.imageUrl.split("/images/")[1]
                  fs.unlink(`images/${filename}`, () => {
                    res.status(200).json({ message: 'Post modifié avec succes!' });
                  });
                }
              })
              .catch(error => res.status(400).json({ error }));
          } else {
            res.status(401).json({ message: 'Vous n\'avez pas les droit pour modifier le post' })
          }
        }
        )
    }
    )
}

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  
  User.findOne({ _id: req.auth.userId })
    .then(user => {
      
      Post.findOne({ _id: req.params.id })
        .then(post => {
         
          if (post.userId == user._id || user.role == "admin") {

            const filename = post.imageUrl.split("/images/")[1]

            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch((error) => res.status(400).json({ error }))
            });
          } else {
            res.status(401).json({ message: 'Vous n\'avez pas les droits pour supprimer ce post' })
          }
        })
        .catch(error => res.status(500).json({ error }))
    }
    )
}
// Récuper un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// Récupérer tout les posts
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

// PARTIE LIKE/DISLIKE SUR POST
exports.likeAndDislike = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let postId = req.params.id

  switch (like) { // Le Switch permet d'ajouter ou de supprimer un "like" ou un "dislike".
    case 1:// Cas n°1 Ajoute un like
      Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))
  }
}


// /!\ ATTENTION = Bout de code permettant de supprimer tous les post de la BDD rapidement = A UTILISER QU'EN DERNEIR RECOURS
//Post.deleteMany({}).then(() => console.log("Posts deleted ")); // Delete all posts in the database