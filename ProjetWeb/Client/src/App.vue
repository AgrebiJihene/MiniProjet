<template>
  <div id="app">
    <!-- <router-link to="/"> [Home] </router-link>
  <router-link to="/restaurant"> [Detail d'un Restaurant] </router-link>
    <router-link to="/hello"> [HelloWorld] </router-link>
-->
       

    <md-app>
      <md-app-toolbar class="md-primary">
        <img src="https://img.icons8.com/clouds/100/000000/restaurant.png"/> <span id="titre">The food court</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="card">
        <md-list>
          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text" 
              ><router-link  class="r" to="/"> Acceuil </router-link></span
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
  components: {
   
  },

  
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Droid serif', serif;
  font-size: 18px;

}

.r{
  text-decoration: none;
  color: inherit;
}

.md-drawer {
  width: 240px;
  max-width: calc(100vw - 125px);
}

#titre {
  color: black;
  font-size: 30px;
  font-family: 'Droid serif', serif;
  //text-decoration: wavy overline rgb(57, 61, 57);

text-shadow:   -1px -1px 0 #5a442d,  
    1px -1px 0 #5a442d,
    -1px 1px 0 #5a442d,
     1px 1px 0 #5a442d;color:#fff;




}

@import "~vue-material/dist/theme/engine";

@include md-register-theme(
  "default",
  (
    primary: black,
    // The primary color of your applicatio
    accent: md-get-palette-color(yellow, A200),
    // The accent or secondary colo
  )
);

@import "~vue-material/dist/components/MdApp/theme";
</style>
