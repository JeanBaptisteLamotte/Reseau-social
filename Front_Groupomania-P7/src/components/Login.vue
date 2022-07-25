<template>
  <div class="container-fluid">
    <div class="container">
      <div class="col-12 d-flex bg-image ">
        <div class="login col-12 d-flex align-items-center py-5">
          <div class="container">
            <div class="col-lg-10 col-xl-7 mx-auto">
              <h3 class="display-5 text-center">Réseau Social Groupomania </h3><br>
              <p class="display-6 text-center">👩‍💻👨‍💻</p>
              <p class="text-muted mb-1 fs-6 text-center">Veuillez rentrer vos identifiants pour vous connecter </p>
              <form>
                <div class="mb-3">
                  <input id="inputEmail" type="email" placeholder="votre adresse mail" required="required" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="email" />
                </div>
                <div class="mb-3">
                  <input id="inputPassword" type="password" placeholder="votre mot de passe" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-danger" v-model="password" />
                </div>
                <div class="d-grid gap-2 mt-2">
                  <button type="submit" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm" @click.prevent="logUser(email, password)">Connexion</button>
                  <router-link to="/signup" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                    Je n'ai pas de compte
                    !</router-link>
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
function logUser(email, password) {
  const url = 'http://localhost:8080/api/auth/login';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then((res) => {
      if (res.error) {
        alert(res.error);
        return;
      }
      if (res.errors) {
        const findMsg = res.errors.find(function (element) {
          return element.msg
        });
        if (findMsg) {
          alert(findMsg.msg);
          return;
        }
      }
      else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('role', res.role);//afin d'affficher les boutons d'editeur ou non
        localStorage.setItem('email', email);

        this.$router.push("/news");
      }
    })
    .catch(error => {

      console.log(error);

    });
}

//en premier le bootstrap s'appliqueras puis pourras etre modifier dans le dur avec app.css
import "bootstrap/dist/css/bootstrap.min.css";
import "/Style.css";
export default {
  name: "Login", data,
  methods: {
    logUser,
  }
};
function data() {
  return {
    email: "",
    password: "",
    error: this.error,
  }
}
</script>

<style>
/* traité avec Bootstrap et App.css (voir au dessus)*/
</style>


