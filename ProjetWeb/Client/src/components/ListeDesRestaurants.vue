<template>
  <div>

    
    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>

      <button>Ajouter</button>
    </form>

    <h1>Nombre de restaurants : {{ nbRestaurantsTotal }}</h1>
    <p>
      Chercher par nom :
      <input
        @input="chercherRestaurant()"
        type="text"
        v-model="nomRestauRecherche"
      />

      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Erreur</md-dialog-title>

        <p>Le restaurant que vous recherchez est inexistant</p>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Fermer</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </p>

    <p>nb de pages total : {{ nbPagesTotal }}</p>
    <p>
      Nb de restau par page
      <input
        @input="getRestaurantsFromServer()"
        type="range"
        min="2"
        max="1000"
        v-model="pagesize"
      />
      {{ pagesize }}
    </p>

    <md-button :disabled="page === 0" @click="pagePrecedente()"
      >Précédent</md-button
    >
    &nbsp; &nbsp;
    <md-button :disabled="page === nbPagesTotal" @click="pageSuivante()">
      Suivant
    </md-button>
    <br />
    &nbsp; Page courante: {{ page }}
    <br />
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">
      <md-table-row>
        <md-table-head>Nom</md-table-head>
        <md-table-head>Cuisine</md-table-head>
        <md-table-head>Ville</md-table-head>
        <md-table-head>Photo</md-table-head>
      </md-table-row>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="Ville" md-sort-by="borough"
          >{{ item.borough }}
        </md-table-cell>

        <md-table-cell md-label="Photo">
          <img src="https://source.unsplash.com/1600x900/?restaurant" alt="" />
        </md-table-cell>

        <md-table-cell md-label="Action">
          <router-link :to="'/restaurant/' + item._id">
            [Detail d'un Restaurant]
          </router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",

  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      nomRestauRecherche: "",
      showDialog: false,

      accesKey: "VYXJ7X--uYDb8jRF8Ll3zmqdJw9sRYwktMiKLHt39NQ",
      url: "https://api.unsplash.com/photos/random",
      image:''
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
  },
  methods: {
    
    chercherRestaurant: _.debounce(function () {
      //fonction anonyme a laquelle je donne le nom chercher rest
      this.getRestaurantsFromServer();
      if (this.nbRestaurantsTotal === 0) {
        console.log("erreur");
        this.showDialog = true;
      } else this.showDialog = false;
    }, 70),

    pagePrecedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.nbPagesTotal) return; // fl correction nteou hat this.dernierepage eli heya var aanesh menha

      this.page++;
      this.getRestaurantsFromServer();
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJs) => {
            // Maintenant resJs est un vrai objet JavaScript
            this.restaurants = resJs.data;
            this.nbRestaurantsTotal = resJs.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    supprimerRestaurant(r) {
      //this.restaurants.splice(index, 1);
      let url = "http://localhost:8080/api/restaurants/" + r._id;
      console.log(r);

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            console.log(resJS.msg);

            //on rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      /* event.preventDefault();
 
                 this.restaurants.push(
                     {
                         name: this.nom,
                         cuisine: this.cuisine
                     }
                 );*/

      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            console.log(resJS.msg);

            //on rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
