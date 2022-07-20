<template>
    <div class="container-fluid">
        <div class="container">
            <div class="col-12 d-flex bg-image">
                <div class="login col-12 d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto">
                                <h3 class="display-5 text-center">Réseau Social Groupomania</h3><br>
                                <p class="display-6 text-center">🖋️</p>
                                <div class="col-12 d-flex bg-image3 "></div>
                                <p class="text-muted mb-1 fs-6 text-center">Veuillez remplir ces champs pour vous inscrire</p>
                                <form>
                                    <div class="mb-3">
                                        <input id="inputEmail" type="email" placeholder="votre adresse mail" required=""
                                            autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4"
                                            v-model="email" />
                                    </div>
                                    <div class="mb-3">
                                        <input id="inputPassword" type="password" placeholder="votre mot de passe" required=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4 text-danger"
                                            v-model="password" />
                                    </div>
                                    <div class="d-grid gap-2 mt-2">
                                        <button type="submit"
                                            class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                            @click.prevent="signUser(email, password)">Inscription</button>
                                        <router-link to="/login"
                                            class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                                            J'ai déjà un compte !</router-link>
                                    </div>
                                </form>
                            </div>
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
 
function signUser(email, password) {
    const url = 'http://localhost:8080/api/auth/signup';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then((res) => {
            if (res.error) {
                console.log(res.error);
                alert(res.error.message);
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
                this.$router.push("/login");
            }
        })
        .catch(error => {
            console.log(error);
        });
}
 
export default {
    name: "Signup",
    methods: {
        signUser,
    }
}
</script>

  