<template>
  <div>
    <div id="titres">
      <h5 :style="{ color: 'rgb(214, 114, 83)' }">
        <md-icon>horizontal_rule</md-icon> Ajout restaurant
        <md-icon>add_circle_outline</md-icon>
        <md-icon>horizontal_rule</md-icon>
      </h5>
      <h4>Vous pouvez publier votre restaurant</h4>
      <p id="parag">
        <mark>The food Court</mark> est incontournable pour les restaurants qui
        souhaitent être visibles sur internet. <br />
        Il est maintenant temps de remplir le formulaire avec les informations
        du restaurant que vous souhaitez publier.
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
          >Rejoignez notre réseau </span
        ><md-icon> create</md-icon>
      </md-card-header>

      <md-card-content>
        <form @submit.prevent="ajouterRestaurant($event)">
          <!--On a utiliser bootstrap pour diviser le formulaire en deux parties (2 colonnes )-->
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <md-field>
                  <label>Nom </label>
                  <md-input
                    name="nom"
                    type="text"
                    required
                    v-model="nom"
                  ></md-input>
                </md-field>
                <md-field>
                  <label>Batiment </label>
                  <md-input
                    name="building"
                    type="text"
                    required
                    v-model="building"
                  ></md-input>
                </md-field>
                <md-field>
                  <label>Ville </label>
                  <md-input
                    name="borough"
                    type="text"
                    required
                    v-model="borough"
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
              <b-col cols="1"></b-col>
              <b-col>
                <md-field>
                  <label>Cuisine </label>
                  <md-input
                    name="cuisine"
                    type="text"
                    required
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
                  <label>Latitude</label>
                  <md-input
                    name="latitude"
                    type="text"
                    v-model="latitude"
                  ></md-input>
                </md-field>
              </b-col>

              <b-col>
                <img
                  src="../assets/form.png"
                  alt=""
                  :style="{ paddingLeft: '60px', height: '300px' }"
                />
              </b-col>
            </b-row>
          </b-container>

          <button class="suivant">Ajouter</button>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>
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
    rgba(130, 191, 231, 0.836) 4%,
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
  background-color: rgb(199, 228, 241);

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

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
export default {
  name: "AjouterRest",

  data: function () {
    return {
      nom: "",
      cuisine: "",
      borough: "",
      building: "",
      street: "",
      zipcode: "",
      latitude: "",
      longitude: "",
    };
  },
  methods: {
    ajouterRestaurant(event) {
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
            alert(resJS.msg);
          });
        })
        .catch(function (err) {
          console.log(err);
          alert(err);
        });

      this.nom = "";
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