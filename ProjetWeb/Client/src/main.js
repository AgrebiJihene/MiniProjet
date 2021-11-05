import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import Restaurant from './components/Restaurant.vue'
import MdModalDialog from 'vue-material-modal-dialog'
import AjouterRest from './components/AjouterRest.vue'
import Acceuil from './components/Acceuil'
import ModifRest from './components/ModifRest'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'leaflet/dist/leaflet.css';


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export const dialog = new Vue()

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(MdModalDialog)

// definir des routes
const router=new VueRouter({
  routes: [ 
    {
      path: '/restaurants',
      component: ListeDesRestaurants
    },
    {
      path: '/',
      component: Acceuil
    },
    
    {
      path: '/restaurant/:id',
      component: Restaurant
    },
    {
      path: '/Ajout',
      component:  AjouterRest
    },
    {
      path: '/modif/:id',
      component: ModifRest
    },

    

  ],
  mode: 'history'
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
