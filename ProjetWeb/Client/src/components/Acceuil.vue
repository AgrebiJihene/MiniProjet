<template>
  <div
    id="acceuil"
    :style="{ 'background-image': 'url(' + require('../assets/123.jpg') + ')' }"
  >
    <div id="titre">
      <h1>The food court</h1>
      <blockquote>
        De la rigeur, de la passion et de l’amour du travail...
      </blockquote>
      <mark
        ><router-link class="r" to="/restaurants"
          >Découvrez nos restaurants</router-link
        ><md-icon>navigate_next</md-icon>
      </mark>
    </div>
  </div>
</template>

<script>
export default {
  name: "Acceuil",
  data: function () {
    return {};
  },
  methods: {},
};
</script>


<style scoped>
#titre {
  padding-top: 200px;
}
#acceuil {
  height: 655px;
  /* background-repeat: no-repeat;*/
  margin-top: 0px;
  margin-right: 20px;
}
h1 {
  text-align: center;
  color: rgb(172, 187, 116);
  padding-bottom: 30px;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  font-size: 60px;
}

blockquote {
  font-style: normal;
  margin-left: 32px;
  font-family: "Segoe Print", "Times New Roman", Verdana;
  text-align: center;
  background-repeat: no-repeat;
  min-height: 30px;
  font-size: 30px;
  color: rgb(214, 114, 83);
  padding-bottom: 20px;
  font-weight: bold;
}

mark {
  font-style: normal;

  color: brown;
  background-color: rgb(195, 202, 180);
  font-size: 22px;
  margin-left: 750px;
  margin-bottom: 500px;
  text-decoration: none;
}
</style>
