<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
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
              <!--

  MAPPPPPPPPPPPPPPPPPPPP

                      <span :style="{ fontWeight: 'bold' }"
                      ><md-icon>push_pin </md-icon> Coordonnées GPS: </span
                    >{{ restaurant.address.coord }}
                    <br />
-->

              <md-card>
                <md-card-content>
                  <p id="info">
                    <span :style="{ fontWeight: 'bold' }"><md-icon>location_on </md-icon> Adresse: </span>
                    {{ building }} {{ street }}, {{ zipcode }} {{ borough }}
                    <br> <br>
                     <span :style="{ fontWeight: 'bold' }"
                      ><md-icon>push_pin </md-icon> Coordonnées GPS: </span
                    >{{ restaurant.address.coord }}
                    <br />

                  </p>

                  <l-map
                    style="height: 350px"
                    :zoom="zoom"
                    :center="[restaurant.address.coord[1],restaurant.address.coord[0]]"
                  >
                    <l-tile-layer
                      :url="url"
                     
                    ></l-tile-layer>
                    <l-marker :lat-lng="[restaurant.address.coord[1],restaurant.address.coord[0]]"></l-marker>
                  </l-map>
                </md-card-content>
              </md-card>
            </b-col>

            <b-col>
              <!--IMAAAAAAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE   
               

   <img :src='img' alt="">
              
                         <img width="500" height="600" :src="urlImg" />
 
              -->
            
          
         <img :src='image'  alt="">

            
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
  "bdb3c367ae547443f",
  "AIzaSyDEAulcUr0fZU1RcoqHTT-ZUJlr3KZu8sg"

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
     
     
      image:"https://source.unsplash.com/1600x900/?restaurant,"+ this.$route.params.id,
     

      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 15,


 

        img:'',
       accesKey:'VYXJ7X--uYDb8jRF8Ll3zmqdJw9sRYwktMiKLHt39NQ',
       urll:'https://api.unsplash.com/photos/random',


        urlImg: null,
    };
  },

  mounted() {
  this.fetchRandomPhoto();
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

      
      
      });
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  methods: {
   async searchImage() {
      if (this.urlImg === null || this.urlImg === "null") {
        window.setImmediate = window.setTimeout;
        await client.search('restaurant'+ this.nom).then((images) => {
          this.urlImg = images[0].url;
        });
      
      }
    },


 fetchRandomPhoto(){
        fetch(this.urll + `?client_id=${this.accesKey}`)
          .then(response => response.json())
        .then((json)=>{
          this.img=json.urls.full
        }).
        catch((err)=>{
          console.log('error',err)
        })
     }
  
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

img{
  width:500px;
  height:350px;
  margin-top:55px;
  margin-left: 20px;
  border-radius: 30px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
}
</style>
