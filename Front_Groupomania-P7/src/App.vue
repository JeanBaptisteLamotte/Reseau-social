<template>
<router-view></router-view> 
</template>

<script>
//Importation des components vue
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
import News from "./components/News.vue";
import Edit from "./components/Edit.vue";
// Exportation du fichier App.vue
export default {
  name: "App",
  components: {
    Signup,
    Login,
    News,
    Edit,
  }
};
</script>

<style>
/* traité avec Bootstrap et App.css */
</style> 
