# Projet Web "The court food"

Ce projet s'inscrit dans le cadre du module Technologie Web,il s'agit d'un site web de gestion des restaurants.  
Il est réalisé par Madame **AGREBI Jihene** et Madame **DRIDI Nour**.
## Table de matières
* [Pré-requis](#Pré-requis)
* [Deploiement](#Deploiement)
* [Technologies](#Technologies)
* [Components](#Components)
* [Fonctionnaités livrées](#Fonctionnalités-livrées)

## Pré-requis
* [Node.js](https://nodejs.org/en/)
* [Vue.js](https://vuejs.org/v2/guide/installation.html)
* [MongoDB](https://docs.mongodb.com/manual/installation/)


## Deploiement
 Faire git clone de notre repository  
 Se placer dans le dossier et taper "code ." pour ouvrir le dossier dans VScode  
 Ouvrir deux terminaux parallèlement
* ##### Terminal 1 bash et lancer les commandes suivantes:
 1.  cd serveur
 2.  npm install
 3. node serverCrudWithMongo.js
* ##### Terminal 2 bash et lancer les commandes suivantes:
 1.  cd client
 2.  npm install
 3.  npm run serve
* Lancer mongodb sur votre machine en saisissant "mongod" 

## Technologies
Afin de mener à bien ce projet,nous avons fait appel aux bibliothèques suivantes:
* [VueMaterial](https://www.creative-tim.com/vuematerial/)
* [Bootstrap](https://bootstrap-vue.org/docs)
* [Vue 2 Leaflet](https://vue2-leaflet.netlify.app/)
* [SweetAlert2](https://sweetalert2.github.io/)

## Components
Nous avons 5 components dont les routes (paths) sont définies dans le fichier main.js.

##### 1. Acceuil.vue
C'est avec ce component que demarre le projet. Il s'agit d'une simple interface d'acceuil.
##### 2. ListeDesRestaurants.vue
C'est le component fard du projet.Il intégre la majorité des fonctionnalités du système. 
Notamment l'affichage de tous les restaurants,la suppression d'un restaurant ,la modification d'un restaurant ou encore sa recherche.
##### 3. Restaurant.vue
Le contenu de ce component s'affiche lorsqu'on appuie sur l'icone 'loop' d'un restaurant,qui existe sur chaque ligne de la table des restaurants.Il permet d'afficher l'ensemble des informations d'un restaurant telles que son nom,sa cuisine,sa ville, son image et son emplacement sur une carte map.
##### 4. AjouterRest.vue
Le contenu de ce component s'affiche lorsqu'on appuie sur "Ajouter un restaurant" dans le menu de  gauche. Il contient un formulaire dont les champs représentent les attributs de tout restaurant dans notre base de données telles que le nom, la cuisine, la latitude, la longitude etc..
##### 5. ModifRest.vue
Le contenu de ce component s'affiche lorqu'on appuie sur l'icone 'edit',qui existe sur chaque ligne de la table des restaurants. Il affiche un formulaire permettant à l'utilisateur de changer les informations d'un restaurant et de sauvegarder ces modifications dans la base des données.


## Fonctionnalités livrées
 Le système réalise l'ensemble des fonctionnalités suivantes:
* Ajouter un restaurant
* [Modifier un restaurant](#Modifier-un-restaurant)
* Supprimer un restaurant
* Lister tous les restaurants
* Afficher le nombre des restaurants(total et par page)
* Dérouler les pages
* [Chercher un restaurant](#Chercher-un-restaurant)
* [Visualiser les détails d'un restaurant avec son image et sa localisation sur GoogleMap](#Details-d'un-restaurant)
 
#### Chercher un restaurant
Le système permet d'effectuer une recherche d'un nom d'un restaurant. L'utilisateur saisit le nom du restaurant qu'il souhaite chercher et le système affiche ce dernier s'il existe. Le cas contraire,il affiche un message disant qu'aucun restaurant ne correspond à cette recherche. 
 La balise suivante de **VueMaterial** permet d'afficher le message mis en description dans le cas où la table est vide(le restaurant n'existe pas).  
 `<md-table-empty-state
        md-label="Restaurant non existant"
        :md-description="Aucun restaurant ne correspond à votre recherche pour ${nomRestRech}. Réessayez avec un autre nom."> `

#### Modifier un restaurant
Le systeme permet à l'utilisateur de modifier les informations d'un restaurant existant par le biais d'un formulaire dont les champs contiennent les informations saisies au préalable. Une fois la modification effectuée,un popup box **(SwwetAlert2)** s'affiche ,indiquant que l'opération a été réalisée avec succés.

#### Details d'un restaurant
Il existe sur chaque ligne de la table une icone qui,lorqu'elle est appuyée, permet de visualiser les informations détaillées du restaurant.Cette icone permet de renvoyer vers un autre component appelé 'Restaurant.vue' en récupérant l'id du restaurant en question. La balise `<router-link :to ="'/restaurant/'+ item._id"> ` renvoit vers le component dont le path est '/restaurant/:id' et effectivement, on arrive à voir l'id sur le path du component lorsqu'on appuie sur l'icone.Une autre interface s'ouvre ainsi affichant les détails de ce restaurant.
* **Carte Map**   
  On retrouve au sein de cette interface l'emplacement du restaurant sur la carte map. Nous avons utilisé la bibliothèque **Vue 2 Leaflet** qui s'appuie sur les coordonnées du restaurant afin de le positionner.Ayant déjà les attributs Longitude et Latitude dans la base des données,l'API les récupère et affiche la position du restaurant sur la carte.
* **Image au hasard**    
 L'interface affiche également une image prise au hasard d'un restaurant. Ceci est réalisé à travers une API qui génére aléatoirement une image différente à chaque restaurant.   
 
 **Lien de notre vidéo de présentation du projet** :






