<template>
  <div id="app">
    <!-- <router-link to="/"> [Home] </router-link>
  <router-link to="/restaurant"> [Detail d'un Restaurant] </router-link>
    <router-link to="/hello"> [HelloWorld] </router-link>
-->
    <md-app>
      <md-app-toolbar class="md-primary">
        <span id="titre">The food court</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card">
        <md-list>
          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text"
              ><router-link to="/"> Acceuil </router-link></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon>restaurant</md-icon>
            <span class="md-list-item-text"><router-link to="/Ajout">Ajouter restaurant</router-link></span>
          </md-list-item>
          <md-list-item>
            <md-icon
              ><span class="material-icons-outlined">
                location_on
              </span></md-icon
            >
            <span class="md-list-item-text">Restaurant à proximité</span>
          </md-list-item>

          <md-list-item>
            <md-icon>done</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>

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
#app {
  font-family: sans-serif;
  font-size: 16px;
}
.md-drawer {
  width: 240px;
  max-width: calc(100vw - 125px);
}

#titre {
  color: black;
  font-size: 30px;
  font-family: sans-serif;
  text-decoration: wavy overline rgb(57, 61, 57);
}

@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(green, A200),
    // The primary color of your applicatio
    accent: md-get-palette-color(yellow, A200),
    // The accent or secondary colo
  )
);

@import "~vue-material/dist/components/MdApp/theme";
</style>
