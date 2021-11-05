<template>
  <div>
    <div id="titres">
      <h5 :style="{ color: 'rgb(214, 114, 83)' }">
        <md-icon>horizontal_rule</md-icon> Liste des restaurants
        <md-icon>list_alt</md-icon>
        <md-icon>horizontal_rule</md-icon>
      </h5>
      <h4>Vous trouverez VOTRE restaurant</h4>
      <p id="parag">
        Envie d'un petit restaurant ou simplement de la livraison d'un repas à
        la maison ? accéderez aux meilleures adresses sur The food court. <br />
        Regroupant <mark> {{ nbRestaurantsTotal }} restaurants</mark>, vous y
        trouverez facilement l'endroit parfait où vous pourrez savourer votre
        déjeuner ou votre dîner.
      </p>
    </div>

    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="8">
          <span
            :style="{
              backgroundColor: 'rgba(201, 199, 187, 0.712)',
              fontWeight: 'bold',
            }"
            >{{ pagesize }}</span
          >
          Restaurants/page <br />

          <input
            @input="getRestaurantsFromServer()"
            type="range"
            min="2"
            max="1000"
            v-model="pagesize"
            :style="{ width: '300px' }"
          />
        </b-col>

        <b-col cols="4">
          <md-field :style="{ width: '350px' }">
            <md-icon>search</md-icon> <label>Chercher par nom</label>
            <md-input
              @input="chercherRestaurant()"
              type="text"
              v-model="nomRestauRecherche"
            ></md-input>
          </md-field>
        </b-col>
      </b-row>
    </b-container>

    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" id="tab">
      <md-table-row id="head"> </md-table-row>

      <md-table-row slot="md-table-row" slot-scope="{ item}">

        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.name
        }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{
          item.cuisine
        }}</md-table-cell>
        <md-table-cell md-label="Ville" md-sort-by="borough"
          >{{ item.borough }}
        </md-table-cell>

       

        <md-table-cell md-label="Actions">
          <router-link :to="'/restaurant/' + item._id">
            <md-icon>loupe</md-icon>
          </router-link>
          &nbsp;
          <a @click="supprimerRestaurant(item)">
            <md-icon>delete</md-icon>
          </a>
          &nbsp;
          <router-link :to="'/modif/' + item._id ">
            <md-icon>edit</md-icon>
          </router-link>
        </md-table-cell>

      </md-table-row>

      <md-table-empty-state
        md-label="Restaurant inexistant"
        :md-description="`Aucun restaurant ne correspond à votre recherche pour '${nomRestauRecherche}'. Réessayez avec un autre nom.`"
      >
      </md-table-empty-state>
    </md-table>

    <div id="btns">
      <md-button
        :disabled="page === 0"
        @click="pagePrecedente()"
        id="prec"
        class="md-primary"
      >
        <md-icon>navigate_before</md-icon>
      </md-button>

      <md-button
        :disabled="page === nbPagesTotal"
        @click="pageSuivante()"
        id="suiv"
        class="md-primary"
      >
        <md-icon>keyboard_arrow_right</md-icon>
      </md-button>
      <br />
      <span :style="{ backgroundColor: 'rgba(201, 199, 187, 0.712)' }">
        Page
        <span :style="{ fontWeight: 'bold', color: 'rgb(70, 91, 209)' }">{{
          page
        }}</span>
        sur {{ nbPagesTotal }}</span
      >
      <!--Page courante sur le nbre de pages total-->
    </div>
  </div>
</template>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

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
        alert(resJS.msg);

            //on rafraichit la vue
            this.getRestaurantsFromServer();
            
          });
        })
        .catch(function (err) {
          console.log(err);
              alert(err);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tab {
  margin-right: 20px;
}

#btns {
  text-align: center;
}
#titres {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

mark {
  font-weight: bold;
  padding: 0.1em 0.4em;
  border-radius: 0.8em 0.3em;
  background: transparent;
  background-image: linear-gradient(
    to right,
    rgba(61, 92, 35, 0.747),
    rgba(125, 224, 140, 0.836) 4%,
    rgba(255, 245, 167, 0.3)
  );
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
#parag {
  font-family: "Comic Sans ";
  font-size: 18px;
}
a:hover {
  background-color: rgb(183, 216, 231);
}
</style>
