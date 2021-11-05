<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar :style="{backgroundColor:'#e2e1d4e3',color:'white'}" md-elevation="0">
        <h3>&bigstar;&bigstar;&bigstar;</h3>
        <span class="md-title" :style="{ color: 'rgb(129, 112, 89)' }">
          {{ name }}
        </span>

        <h3>&bigstar;&bigstar;&bigstar;</h3>
      </md-app-toolbar>

      <md-app-content>
        <b-container class="bv-example-row">
          <h6 id="bien">
            Bienvenue à <mark id="mark1"> {{ name }} </mark>,
          </h6>
          <p id="descrip">
            Profitez d'une cuisine <mark>{{ cuisine }}</mark> dans une adresse
            hors du commun à <mark>{{ borough }} </mark> , <br />
            Découvrez ce restaurant avec la map et la photo .
          </p>

          <b-row>
            <b-col>
              <md-card>
                <md-card-content>
                  <p id="info">
                    <span :style="{ fontWeight: 'bold' }"
                      ><md-icon>location_on </md-icon> Adresse:
                    </span>
                    {{ building }} {{ street }}, {{ zipcode }} {{ borough }}
                    <br />
                    <br />
                    <span :style="{ fontWeight: 'bold' }"
                      ><md-icon>push_pin </md-icon> Coordonnées GPS: </span
                    >{{ restaurant.address.coord }}
                    <br />
                  </p>

                  <l-map
                    style="height: 350px"
                    :zoom="zoom"
                    :center="[
                      restaurant.address.coord[1],
                      restaurant.address.coord[0],
                    ]"
                  >
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-marker
                      :lat-lng="[
                        restaurant.address.coord[1],
                        restaurant.address.coord[0],
                      ]"
                    ></l-marker>
                  </l-map>
                </md-card-content>
              </md-card>
            </b-col>

            <b-col>
              <img width="500" height="600" :src="urlImg" />
            </b-col>
          </b-row>

          <button id="retour">
            <router-link
              to="/restaurants"
              :style="{ color: 'black', textDecoration: 'none' }"
            >
              <md-icon>keyboard_double_arrow_left </md-icon></router-link
            >
          </button>
        </b-container>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const GoogleImages = require("google-images");
const client = new GoogleImages(
  "90612c01877c84eb4",
  "AIzaSyA8u0KsoKjyFIdnd-xHWKBlE5NtkfnyyDs"
);

export default {
  name: "Restaurant",
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
      borough: "",
      cuisine: "",
      building: "",
      zipcode: "",
      street: "",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15,

      urlImg: null,
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
        this.name = this.restaurant.name;
        this.cuisine = this.restaurant.cuisine;
        this.borough = this.restaurant.borough;
        this.building = this.restaurant.address.building;
        this.zipcode = this.restaurant.address.zipcode;
        this.street = this.restaurant.address.street;
        this.urlImg = this.restaurant.url;

        //console.log("NON API",this.urlImg)
      });

    this.ChercherImage();
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  methods: {
    AddUrl() {
      let data = new FormData();
      data.append("urlImg", this.urlImg);
      let url = "http://localhost:8080/api/restaurant/" + this.id;
      fetch(url, {
        method: "PUT",
        body: data,
      })
        .then((responseJSON) => {
          responseJSON.json().then((res) => {
            console.log("Url ajouté, " + res.msg);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async ChercherImage() {
      window.setImmediate = window.setTimeout;
      // si on n'a pas le parametre page c'est par defaut 1, ça nous envoie un tableau qui contient les 10 premiers resultats dans la page 1
      // Et la page 2 a le prochain ensemble de 10, etc..
      //on a utilisé la fct getRandom(max) pour generer des nombres au hasard pour avoir des images differentes à chaque fois
      // ici pour le parametre page on a choisi les nombres entre 1 et 20 au hasard
      // Mais pour images[this.getRandom(10)] il faut avoir un nbre entre 0 et 9 puisque images est un tableau de 10 elements
      await client
        .search("RESTAURANT", { page: this.getRandom(20) + 1 })
        .then((images) => {
          this.urlImg = images[this.getRandom(10)].url; 
          console.log(images);

          console.log("URL " + this.urlImg);
        });
      this.AddUrl();
    },
    // fct qui genere un nombre au hasard entre 0 et max
    getRandom(max) {
      return Math.floor(Math.random() * max);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

#descrip {
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
}

#bien {
  text-align: center;
  margin-top: 10px;
}

#info {
  margin-left: 10px;
  font-size: 14px;
}

mark {
  font-weight: bold;
  padding: 0.1em 0.4em;
  border-radius: 0.8em 0.3em;

  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

#mark1 {
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

#retour {
  margin-top: 15px;
  margin-left: 20px;
  overflow: hidden;
  background-color: rgb(243, 253, 228);

  line-height: 0;

  padding: 0px 20px 0px 20px;
  display: inline-block;
  border-radius: 10px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  text-transform: none;
}

a:hover {
  background-color: rgb(210, 226, 179);
}

img {
  width: 500px;
  height: 350px;
  margin-top: 55px;
  margin-left: 20px;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
}
</style>
