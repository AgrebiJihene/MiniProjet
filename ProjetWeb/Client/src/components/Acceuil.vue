<template>
  <div class="acceuil">
    <button  @click=prev() type="button" class="btn btn-left">
      <img src="../assets/chevron-left.svg" alt="" class="icone" />
    </button>
    <div class="container-slides" :style="{transform: `translateX(${index}px)`, transition: `${transition}`}">
      <img src="../assets/ph1.jpg" alt="" class="img-slider" />
      <img src="../assets/ph2.jpg" alt="" class="img-slider" />
      <img src="../assets/ph3.jpg" alt="" class="img-slider" />
    </div>

    <button @click=next() type="button" class="btn btn-right">
      <img src="../assets/chevron-right.svg" alt="" class="icone" />
    </button>
  </div>
</template>

<script>
export default {
  name: "Acceuil",
  data: function () {
    return {
      index: 0,
      transition: "transform 0.2s ease"
    };
  },
  methods: {
    next() {
        console.log(this.index)
      if (this.index === -1500) {
          this.transition="none" // on n'a pas une transition à la fin
        this.index = 0;
      } else {
          this.transition="transform 0.2s ease"
        this.index -= 500;
      }
    },

    prev(){
 if (this.index === 0) {
          this.transition="none" 
        this.index = -1500;
      } else {
          this.transition="transform 0.2s ease"
        this.index += 500;
      }

    }
  },
};
</script>


<style scoped>
.acceuil {
  
  overflow: hidden;
  position: relative;
}

.container-slides {
  display: flex;
}

.img-slider {
  width: 100%;
  height: auto;
}

.btn {
  outline: none;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  position: absolute;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icone {
  width: 15px;
}

.btn-left {
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
}

.btn-right {
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}
</style>
