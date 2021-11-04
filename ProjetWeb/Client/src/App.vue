<template>
  <div id="app">
    <!-- <router-link to="/"> [Home] </router-link>
  <router-link to="/restaurant"> [Detail d'un Restaurant] </router-link>
    <router-link to="/hello"> [HelloWorld] </router-link>
-->

    <md-app id="background">
      <md-app-toolbar class="md-primary">
        <img src="./assets/restaurant-vegetarien.png" /> &nbsp; &nbsp;<span
          id="titre"
          >The food court</span
        >
      </md-app-toolbar>

      <md-app-drawer md-permanent="card">
        <md-list>
          <md-list-item>
            <md-icon :style="{color:'#978876'}">home</md-icon>
            <span class="md-list-item-text"
              ><router-link class="r" to="/" > Acceuil </router-link></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon  :style="{color:'#978876'}">restaurant</md-icon>
            <span class="md-list-item-text"
              ><router-link to="/restaurants"
                >Nos restaurants</router-link
              ></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon  :style="{color:'#978876'}">dinner_dining</md-icon>
            <span class="md-list-item-text"
              ><router-link to="/Ajout"
                >Ajouter votre restaurant</router-link
              ></span
            >
          </md-list-item>
       
        </md-list>
      </md-app-drawer>

      <md-app-content id="back">
        <router-view> </router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss" scoped>
#background {
  // background: url("C:/Users/msi/Documents/GitHub/MiniProjet/ProjetWeb/Client/src/assets/back.jpg");
  background-color: rgb(248, 244, 237);
}
#back {
  background-color: rgb(248, 244, 237);
}

.r {
  text-decoration: none;
  color: inherit;
}

.md-drawer {
  width: 240px;
  max-width: calc(100vw - 125px);
}

#titre {
  font-size: 30px;
  font-family: "Droid serif", serif;

  text-shadow: -1px -1px 0 #5a442d, 1px -1px 0 #9e8569, -1px 1px 0 #5a442d,
    1px 1px 0 #5a442d;
  color: #fff;
}

@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: black,
    // The primary color of your applicatio
    accent:rgb(192, 202, 156),
   // accent:#978876,
    // The accent or secondary colo
  )
);

@import "~vue-material/dist/components/MdApp/theme";
</style>
