<template>
  <div class="container-sm ">
    <nav class=" navbar navbar-expand-lg navbar-light bg-image mt-4">
      <div class="container-fluid bg-light">
        <a class="navbar-brand" href="/">
          <img class="rounded-circle m-2" src="../../public/img_et_logos/nom_+_logo.png" alt="logo Groupomania" width="150" height="80">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <button class="btn  like btn-sm mt-1 m-1 m-lg-4 " @click="getPosts(this.post, name, title, imageUrl, content, usersLiked, date)">All posts</button>
              <button class="btn  like btn-sm mt-1 m-1" @click="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="form-floating">
      <h3 class="navbar-brand text-center m-4 text-white">Des nouvelles {{ this.post.name }} ?</h3>
      <div class="d-flex bg-image">
        <textarea class="form-control m-3" placeholder="Titre de votre post" v-model="title" type="text"></textarea>
        <textarea class="form-control m-3" placeholder="Tapez votre texte" id="floatingTextarea" v-model="content" type="text"></textarea>
      </div>
    </div>

    <div class="d-flex  mt-1">
      <label v-if="title != '' && content != ''" for="file-input" class=" btn-light customBtn btn-lg mt-1">Rajoutez une Image</label>
      <input id="file-input" type="file" @change="fileSelect"/>
      <button v-if="title != '' && content != ''" type="submit" class="btn customBtn btn-light btn-lg mt-1 ms-auto" @click="sendPost(this.post, title, content), getPosts()">Envoyer</button>
    </div>
    <hr class="mt-4 dropdown-divider"/>
    <li v-for="post in posts">
      <div class="card mb-3 m-auto">
        <div class="card-header mb-3">
          <img src="../../public/img_et_logos/pp.png" class="rounded-circle m-2" alt="logo de groupomania">
          {{ post.name }} &#9997 {{ post.date }}
        </div>
        <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top" alt="image postée par un utilisateur">
        <hr class="mt-3 dropdown-divider" />
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
          <div class="d-flex bg-light">
            <div class="like">
              <div id="heart" @click="likePost(post._id, post.likes, post.usersLiked)">
                <div id="left" class="segments"></div>
                <div id="right" class="segments"></div>
              </div>
              <div id="like-count">{{ post.likes }}</div>
            </div>
            <button v-if="userId == post.userId || role == 'admin'" id="edit" type="button"
              class="btn  btn-lg  ms-auto like" @click="editPost(post._id)">Edit</button>
            <button v-if="userId == post.userId || role == 'admin'" id="delete" type="button"
              class="btn btn-lg  ms-auto like" @click="deletePost(post._id)">Delete</button>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>



<script>
// Bouton Deconnexion
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  this.$router.push("/login");
}
//Date et heures de l'envoi du courrier par l'utilisateur
function dateTime() {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return date + "/" + month + "/" + year;
}
//Retrouver le nom de l'utilisateur à partir de son email
function userName() {
  const email = localStorage.getItem('email');
  const name = email.substring(0, email.lastIndexOf("@"));
  return name;
}
//Envoyer un post
function sendPost(post) {

  const url = 'http://localhost:8080/api/posts';
  const formData = new FormData();
  if (post.imageUrl) {
    formData.append('image', post.imageUrl);}
  formData.append('userId', localStorage.getItem('userId'));
  formData.append('name', post.name);
  formData.append('date', post.date);
  formData.append('title', post.title);
  formData.append('content', post.content);
  formData.append('likes', post.likes);
  formData.append('usersLiked', post.usersLiked);

  fetch(url, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },
    body: formData
  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
      location.reload();
     })
    .catch(error => {
      if (error.status !== 200) {
        alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        this.$router.push("/login");
        console.log(error);
      }
    })
}
// Données des messages de l'utilisateur
function data() {
  return {
    posts: [],
    userId: "",
    title: '',
    content: '',
    post: {
      userId: '',
      date: dateTime(),
      name: userName(),
      title: '',
      content: '',
      imageUrl: '',
      likes: 0,
      usersLiked: [],
    },
  }
}
// Faire apparaitre tous les messages
function getPosts() {
  const url = 'http://localhost:8080/api/posts';
  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  })
    .then(response => response.json())
    .then((res) => {
      this.posts = res.reverse();
    })
    .catch(error => {
      if (error.status !== 200) {
        alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        this.$router.push("/login");
        console.log(error);
      }
    })
}
// Supprimer un message si cet utilisateur est le propriétaire du message
function deletePost(id) {
  const url = 'http://localhost:8080/api/posts/' + id;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify({ id: id })
  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
      this.getPosts();
    })
    .catch(error => {
      if (error.status !== 200) {
        alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        this.$router.push("/login");
        console.log(error);
      }
    })
}
// Modifier un message si cet utilisateur est le propriétaire du message
function editPost(id) { 

  const url = 'http://localhost:8080/api/posts/' + id;
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
  })
    .then(response => response.json())
    .then((res) => {
      this.post = res;
      this.$router.push("/edit/" + id);
    })
    .catch(error => {
      if (error.status !== 200) {
        alert("Oups ! Un problème est survenu. Veuillez vous reconnecter.");//_____ Get  if the token is valid !
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        this.$router.push("/login");
        console.log(error);
      }
    });
}
// Possibilité pour le user de liker un message mais seulement une seule fois par post /!\
function likePost(id, like, usersLiked) {
   //Un seule Like par user
  const currentUserId = localStorage.getItem("userId");
  const userLike = usersLiked.find(user => user === currentUserId);
  if (userLike) {
    alert("C'est gentil mais vous avez déjà liké ce post !");
    return;
  }

  if (like = 1) {
    this.post.likes = this.post.likes + 1;
  }
  const url = 'http://localhost:8080/api/posts/' + id + "/like";
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify({
      like: like,
      usersLiked: usersLiked,
      id: id,
      userId: localStorage.getItem("userId")
    })
  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
      this.getPosts();
    })
    .catch(error =>{
      console.log(error);
    })
}

// Export du component News
export default {
  name: "News", data,
  methods: {
    sendPost() {
      this.post.userId = localStorage.getItem("userId"),
        this.post.date = dateTime(),
        this.post.name = userName(),
        this.post.title = this.title,
        this.post.content = this.content,
        this.post.imageUrl = this.imageUrl,
        this.post.likes = 0,
        this.post.usersLiked = [],
        sendPost(this.post)
    },
    // Sélectionnez l'image à télécharger
    fileSelect(e) {
      console.log("e: ", e.target.files[0]);
      this.imageUrl = e.target.files[0];
    },
    likePost,
    dateTime,
    getPosts,
    logout,
    deletePost,
    editPost,
  },
  // mounted() est appelé une fois que le composant est chargé
  mounted() { 
    this.getPosts()
    this.userId = localStorage.getItem("userId");
    this.role = localStorage.getItem("role");
    }
}
</script>



<style >

.card {
  box-shadow: 5px 5px 10px 1px rgba(88, 77, 77, 0.42);
  animation: cardPostAnim 1s ease 0s 1 normal forwards;
}
/* Animation du post qui tombe */
@keyframes cardPostAnim {
  0% {
    animation-timing-function: ease-in;
    opacity: 1;
    transform: translateY(-45px);
  }
  24% {
    opacity: 1;
  }
  40% {
    animation-timing-function: ease-in;
    transform: translateY(-24px);
  }
  65% {
    animation-timing-function: ease-in;
    transform: translateY(-12px);
  }
  82% {
    animation-timing-function: ease-in;
    transform: translateY(-6px);
  }
  93% {
    animation-timing-function: ease-in;
    transform: translateY(-4px);
  }
  25%, 55%, 75%, 87% {
    animation-timing-function: ease-out;
    transform: translateY(0px);
  }
  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateY(0px);
  }
}

input {
  display: none;
}
textarea {
  resize: none !important;
}

p {
  font-size: 1.0rem;
  font-family: "lato";
  color: #010101;
}

li {
  list-style: none;
}

body {
  background-color: #4E5166 !important;
}


.card-header img {
  width: 60px;
  height: 60px;
  border: solid 1px #FD2D01;
  box-shadow: 5px 5px 20px 1px rgba(0, 0, 0, 0.42);
}

img {
  max-height: 30rem;
  object-fit: contain;
  
}


.like {
  height: 3rem;
  width: fit-content;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.5s ease !important;
}

.like:hover {
  background-color: #FFD7D7 !important;
  transform: scale(1.1);
}

.customBtn {
  height: 3rem;
  width: fit-content;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.5s ease !important;
}

.customBtn:hover {
  transform: scale(1.1);
}

.segments {
  height: 30px;
  width: 20px;
  border-radius: 100px 100px 0px 0px;
  background-color: #FD2D01
}


#heart {
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: solid 1px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

#heart>#left {
  transform: rotate(-45deg) translate(40%);
  margin-top: 10px;

}

#heart>#right {
  transform: rotate(45deg) translate(-40%);
  margin-top: 10px
}

#like-count {
  margin: 0px 10px;
  font-size: 30px;
  font-family: monospace;
}
</style>