<template>
    <div class="container-sm">
        <nav class="navbar navbar-expand-lg navbar-light bg-image mt-3">
            <div class="container-fluid bg-light">
                <img class="rounded-circle m-2" src="../../public/img_et_logos/nom_+_logo.png" alt="logo Groupomania" width="150" height="80">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/news" class="btn btn-light  btn-lg mt-1 m-1 like m-lg-3">All posts
                            </router-link>
                            <button class="btn btn-light btn-lg mt-1 m-1 like" @click="logout()">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <hr class="mt-4 mb-4 dropdown-divider" />
        <div class="card mb-3 m-auto">
            <div class="card-header">
                <h3>Modification du post</h3>
            </div>
            <img v-if="post.imageUrl" :src="post.imageUrl" class="card-img-top mt-3" alt="...">
            <hr class="mt-3 dropdown-divider" />
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.content }}</p>
            </div>
        </div>
        <div class="form-floating">
            <div class="d-flex bg-light">
                <textarea class="form-control m-3" placeholder="Title" v-model="post.title"></textarea>
                <textarea class="form-control m-3" placeholder="Tape your text" id="floatingTextarea"
                    v-model="post.content"></textarea>
            </div>
        </div>
        <div class="d-flex bg-light mt-3 ">
            <label for="file-input" class="btn btn-light  btn-lg  like">Add Image</label>
            <input id="file-input" type="file" @change="fileSelect" />
            <button class="btn btn-light btn-lg  ms-auto like " @click="updatePost()">Update</button>
            <router-link to="/news" class="btn btn-light  btn-lg  ms-auto like ">All posts</router-link>
        </div>
        <hr class="mt-4 dropdown-divider" />
    </div>
</template>

<script>
// Deconnexion du User
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    this.$router.push("/login");
}

// Obtenir le message par l'ID
function getPostById() {
    const id = window.location.href.split('/').pop(); // Récupérer l'identifiant de l'url
    const url = 'http://localhost:8080/api/posts/' + id;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
    })
        .then(response => response.json())
        .then((res) => {
            this.post = res;
        })
        .catch(error => {
            // Bloc permettant de verifier si le Token est bien valide
            if (error.status !== 200) {
            alert("Un problème est survenu. Veuillez vous reconnecter.");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            this.$router.push("/login");
            console.log(error);
            }  
        });
}
// Modification d'un Post
function updatePost(post) {
location.reload();
    const formData = new FormData();
    if (post.imageUrl) {
        formData.append('image', post.imageUrl);
    }
    formData.append('title', post.title);
    formData.append('content', post.content);

    const id = window.location.href.split('/').pop();

    const url = 'http://localhost:8080/api/posts/' + id;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },

        body: formData
    })
        .then(response => response.json())
        .then((res) => {
            console.log(res);

        })
        .catch(error => {
            console.log(error);
        });
}
// données sur les messages du User
function data() {
    return {
        posts: [],
        post: {
            title: '',
            content: '',
            imageUrl: '',
        },
    }
}
// definition des composants d'exportation
export default { 
    name: "Edit", data,
    methods: {
        getPostById,
        logout,
        updatePost() {

            
                this.post.title = this.post.title,
                this.post.content = this.post.content,
                this.post.imageUrl = this.imageUrl,

                updatePost(this.post)
        },
        fileSelect(e) { // _________________________ Select image 
            console.log("e: ", e.target.files[0]);
            this.imageUrl = e.target.files[0];
        },
    },
    mounted() {// Mount the component

        this.getPostById();
    }
}

</script>


<style >
.like { /**Style of buttons */
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
</style>
