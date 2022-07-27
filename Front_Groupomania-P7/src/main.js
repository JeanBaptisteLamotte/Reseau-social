import { createApp } from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import News from './components/News.vue'
import Edit from './components/Edit.vue'



import { BootstrapVue3 } from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { createRouter, createWebHistory } from 'vue-router'

// Les routes sont les chemins sur lesquels l'utilisateur peut cliquer pour accéder à une page spécifique.
const routes = [ 

    { path: '/', component: Home },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/news', component: News },
    { path: '/edit/:id', component: Edit },
]

const router = createRouter({ history: createWebHistory(), routes })

// "BeforeEach" est un crochet qui est appelé avant chaque transition de route.
router.beforeEach((to) => {
    // Si l'utilisateur n'est pas connecté et qu'il tente d'accéder à une page privée, il est redirigé vers la page de connexion.
    if (isLoginRequired(to)) { 
        return router.push('/login')
    }

})
function isLoginRequired(to) {
    if (!isPrivatePage(to)) return false
    if (!isTokenInCache()) return true
    if (!isTokenValid()) return true
    return false
}
// Définir si la page est privée ou non
function isPrivatePage(to) { 
    const publicPages = ['/login', '/signup', '/']
    return !publicPages.includes(to.path)
}
// Obtenir si le jeton est dans le cache
function isTokenInCache() { 
    return localStorage.getItem('token') != null
}
function isTokenValid() {

    const token = localStorage.getItem('token')
    return token != null
}

createApp(App).mount('#app')
const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)

app.mount('#app')


