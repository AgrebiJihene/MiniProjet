<template>
  <div>
    <div id="titres">
      <h5 :style="{ color: 'rgb(214, 114, 83)' }">
        <md-icon>horizontal_rule</md-icon> Modification restaurant
        <md-icon>drive_file_rename_outline</md-icon>
        <md-icon>horizontal_rule</md-icon>
      </h5>
      <h4>Vous pouvez modifier votre restaurant</h4>
      <p id="parag">
        The food Court vous permet de signaler immédiatement tout changement de
        situation. <br />
        Il est maintenant temps de remplir le formulaire avec les modifications
        du restaurant <mark> {{name }} </mark>.
      </p>
    </div>

    <md-card>
      <md-card-header>
        <br />
        <span
          :style="{
            color: 'green',
            textDecoration: 'underline',
            fontSize: '16px',
          }"
          >Restez à jour</span
        ><md-icon> create</md-icon>
      </md-card-header>

      <md-card-content>
        <form @submit.prevent="updateRestaurant(id, $event)">
          <!--On a utiliser bootstrap pour diviser le formulaire en deux parties (2 colonnes )-->
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <md-field>
                  <label>Nom </label>
                  <md-input name="name" type="text" v-model="name"></md-input>
                </md-field>
                <md-field>
                  <label>Batiment </label>
                  <md-input
                    name="building"
                    type="text"
                    v-model="building"
                  ></md-input>
                </md-field>
                <md-field>
                  <label>Ville </label>
                  <md-input
                    name="borough"
                    type="text"
                    v-model="borough"
                  ></md-input>
                </md-field>

                <md-field>
                  <label>Latitude</label>
                  <md-input
                    name="latitude"
                    type="text"
                    v-model="latitude"
                  ></md-input>
                </md-field>
              </b-col>
              <b-col cols="1"></b-col>
              <b-col>
                <md-field>
                  <label>Cuisine </label>
                  <md-input
                    name="cuisine"
                    type="text"
                    v-model="cuisine"
                  ></md-input>
                </md-field>

                
                <md-field>
                  <label>Rue </label>
                  <md-input
                    name="street"
                    type="text"
                    required
                    v-model="street"
                  ></md-input>
                </md-field>
                <md-field>
                  <label>Code Postal</label>
                  <md-input
                    name="zipcode"
                    type="text"
                    required
                    v-model="zipcode"
                  ></md-input>
                </md-field>

                <md-field>
                  <label>longitude</label>
                  <md-input
                    name="longitude"
                    type="text"
                    v-model="longitude"
                  ></md-input>
                </md-field>
              </b-col>

              <b-col>
                <img
                  src="../assets/formmodif.png"
                  alt=""
                  :style="{ paddingLeft: '60px', height: '300px' }"
                />
              </b-col>
            </b-row>
          </b-container>

          <button class="suivant">Modifier</button>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>



<script>
export default {
  name: "ModifRest",
  props: {},
  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  data: function () {
    return {
      restaurant: null,

      name: "",
      cuisine: "",
      borough: "",
      building: "",
      street: "",
      zipcode: "",
      latitude: "",
      longitude: "",
    };
  },

  mounted() {
    console.log("Avant affichage, on pourra faire un fetch ..");
    console.log("ID = " + this.id);
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.restaurant.name);
        this.restaurant = data.restaurant;
        this.name = this.restaurant.name; //si l'utilis ne veut pas modifier le nom par exemple il n'est pas obligé de le reecrire
        this.cuisine = this.restaurant.cuisine;
        this.borough=this.restaurant.borough;
        this.building=this.restaurant.address.building;
        this.street=this.restaurant.address.street;
        this.zipcode=this.restaurant.address.zipcode;
        this.latitude=this.restaurant.address.coord[0];
                this.longitude=this.restaurant.address.coord[1];

      });
  },
  methods: {
    updateRestaurant(id, event) {
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants/" + id;

      fetch(url, {
        method: "PUT",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            console.log(resJS.msg);
                alert(resJS.msg+"\nCliquer sur OK pour revenir à la liste des restaurants afin de vérifier vos modifications .");
            this.$router.go(-1) // revenir en arriere en historique

          });
        })
        .catch(function (err) {
          console.log(err);
          alert(err+"\nCliquer sur OK pour revenir à la liste des restaurants")
                      this.$router.go(-1)

        });

      this.name = "";
      this.cuisine = "";
      this.borough = "";
      this.building = "";
      this.street = "";
      this.zipcode = "";
      this.latitude = "";
      this.longitude = "";

      

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    rgba(231, 213, 130, 0.836) 4%,
    rgba(255, 245, 167, 0.3)
  );
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

#parag {
  font-family: "Comic Sans ";
  font-size: 18px;
}

.suivant {
  overflow: hidden;
  background-color: rgb(221, 241, 199);

  font-size: 14px;
  font-weight: 500;
  line-height: 0;

  padding: 0px 20px 0px 20px;
  display: inline-block;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  margin-left: 750px;
  text-transform: none;
  padding: 15px 22px 15px 22px;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>


