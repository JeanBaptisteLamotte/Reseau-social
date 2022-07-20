<template>
    <div class="container-fluid">
        <div class="container">
            <div class="col-12 d-flex bg-image ">
                <div class="login col-12 d-flex align-items-center py-5">
                    <div class="container">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-5 text-center">Bienvenue sur le Réseau Social Groupomania </h3><br>
                            <p class="display-6 text-center">🤗</p>
                            <p class="text-muted mb-2 text-center">Restez connecté même en dehors du travail! </p><br>
                            <form>
                                <div class="d-grid gap-2 mt-2">
                                    <router-link to="/signup"
                                        class="btn btn-outline-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Inscription</router-link>
                                    <router-link to="/login"
                                        class="btn btn-outline-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Connexion</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>  


<script>
//en premier le bootstrap s'appliqueras puis pourras etre modifier dans le dur avec app.css
import "bootstrap/dist/css/bootstrap.min.css";
import "/App.css";

export default {
    name: "Home",
}
</script>

<style>
/* traité avec Bootstrap et App.css (voir au dessus)*/
</style> 


