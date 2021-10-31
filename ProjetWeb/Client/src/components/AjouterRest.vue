<template>
  <div>
    <div id="soustitre">
      <h3>Ajout restaurant</h3>
      <span>Publiez votre restaurant sur notre site</span>
    </div>

    <md-steppers>
      <md-step id="first" md-label="First Step">
        <form @submit.prevent="ajouterRestaurant($event)">
          <label>
            Nom : <input name="nom" type="text" required v-model="nom" />
          </label>
          <label>
            Cuisine :
            <input name="cuisine" type="text" required v-model="cuisine" />
          </label>

          <label>
            borough :
            <input name="borough" type="text" required v-model="borough" />
          </label>

          <button>Ajouter</button>
        </form>
      </md-step>

      <md-step id="second" md-label="Second Step"> </md-step>

      <md-step id="third" md-label="Third Step"> </md-step>
    </md-steppers>
  </div>
</template>
<style scoped>
#soustitre {
  text-align: center;
  margin-bottom: 20px;
}
</style>
<script>
export default {
  name: "AjouterRest",

  data: function () {
    return {
      nom: "",
      cuisine: "",
      borough: "",
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
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
      this.borough = "";
    },
  },
};
</script>