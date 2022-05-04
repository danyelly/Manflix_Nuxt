<template>
  <div>
    <div class="main">
      <div class="InfoFixa">
        <div
          class="imgFixa"
          style="
            background-image: url('demolidor.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            width: 100%;
            height: 500px;
          "
        >
          <div class="conteudo">
            <img id="demo" src="Tdemolidor.jpg" /><br />
            <div class="classificacao">
              <img class="estrelas" src="estrelas.png" />
              <p style="width: 300px">2016 2 temporadas</p>
              <button>ULTRA <b>HD 4K</b></button>
              <button style="width: 50px; margin-left: 15px"><b>5.1</b></button
              ><br />
            </div>
            <br />
            <p>
              Cego desde pequeno, Matt Murdock luta contra a injustiça durante o
              dia<br />
              como advogado e à noite nas rua de Hell's Kitchen, Nova York.
            </p>

            <br />
            <br />
            <br />
            <p style="font-size: 15px">
              Charlie Cox, Deborah Ann Woll, Elden Henson<br />Séries, Séries
              policiais e sobre crime
            </p>
          </div>
        </div>
      </div>
      <div class="divModal">

        <Dialog 
        class="modalImg"
        :visible.sync="showDialogV"
        :dismissableMask="true"
        :closeOnEscape="true"
        
        :style="{width: '35vw'}"        
        >
        <img
                class="imgModal"
                :src="imgModal"
              />
              <br>
        <i class="pi pi-star" style="font-size: 1.5rem; cursor:pointer; display:flex;" v-on:click="fav(idMovie)" :visible="showIcon">
          <h3 style="display:flex; justify-content:center; ">{{nameMovie}}</h3>
          
        </i>
        <div class="divDescricao">
          <p class="descricao" style="padding-top:30px; color:black;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <p class="descricao" style="padding-top:30px; color:black;"><b>Genêro:</b>&nbsp{{categoryMovie}}
          </p>
        </div>
        
        
      </Dialog> 
      </div>
       
       <div class="cards"
      v-if="favoritos.length != 0"
      >
        <h2 style='color:white; padding-left:30px'>Minha Lista</h2>
        <div class="carousel">
          <div class="carouselbox">
            <div v-for="(myMovieFav, index) in favoritos" :key="index" >
              <img
                class="img-1 slider-img"
                :src="myMovieFav"
              />
              
            </div>
          </div>
          <a class="switchLeft sliderButton" v-on:click="switchLeft($event)"
            ><</a
          >
          <a class="switchRight sliderButton" v-on:click="switchRight($event)"
            >></a
          >
        </div>
      </div>

      <div class="cards"
      v-if="moviesList"
      >
      <h2 style='color:white; padding-left:30px'>Em Alta</h2>
        <div class="carousel">
          <div class="carouselbox">
            <div v-for="(myMovie, index) in moviesList" :key="index" >
              <img
                class="img-1 slider-img"
                :src="'http://localhost:8000' + myMovie.poster" v-on:click="showDialog(myMovie.id, myMovie.name, myMovie.category)"
              />
              
            </div>
          </div>
          <a class="switchLeft sliderButton" v-on:click="switchLeft($event)"
            ><</a
          >
          <a class="switchRight sliderButton" v-on:click="switchRight($event)"
            >></a
          >
        </div>
      </div>

      
      
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      showDialogV: false,
      showIcon: true,
      moviesList: [],
      idMovie: 1,
      amountLeft: 0,
      amountRight: 0,
      scrollPerClick: "",
      imgModal: "",
      imgModalFav: "",
      favoritos: [],
      nameMovie:"",
      categoryMovie:"",
      idlistFav:[],
      exist: false,
    };
  },
  middleware: "auth",
  layout: "standard",
  

  methods: {
    scrollAmount: 0,
    fav(e){
      console.log('e i:',e)
      console.log('lista fora:',this.idlistFav)
      for(let i=0; i<=this.idlistFav.length; i++){
        if(this.idlistFav[i]!=e){
          console.log('é different')
          this.exist = true;
        }
        else if(this.idlistFav[i]==e){
         
          console.log('n é different')
          this.exist = false;
        }
          
      }
      console.log('----------EXIST---------:',this.exist);
      if(this.exist==true)
        {
          console.log('verifica')
          this.idlistFav.push(e)
          this.imgModalFav = 'http://localhost:8000' + this.moviesList[e-1].poster;
          this.favoritos.push(this.imgModalFav)
          console.log('favoritos:',this.favoritos)
          this.showDialogV = false;
        }   
      else if(this.exist!=true){
          this.showDialogV = false;
      }
        
       // this.$axios
      //   .post(this.$store.state.BASE_URL + "/api/v1/users/", body)
      //   .then((response) => {
      //     console.log("cadastro do user ok");
      //     console.log(response);
      //     this.user.idUser = response.data.id;
      //     this.registerUsuarios();
      //   })
      //   .catch((error) => {
      //     console.log("cadastro do user ERRADO!");
      //     console.log(error);
      //     this.user = null;
      //   });
      // console.log('e i:',e.target.hidden)
      // e.target.hidden = true;
      // if( this.showIcon===true ){
      //   this.showIcon=false;
      // }
      console.log('oi fav')
    },
    showDialog(id,name, category){
      console.log(id)
      this.idMovie = id;
      if (this.showDialogV === false) {
        this.showDialogV = true;
        this.imgModal = 'http://localhost:8000' + this.moviesList[this.idMovie-1].poster;
        this.nameMovie = name;
        this.categoryMovie = category;
      }
      else
        this.showDialogV=false
    },
    switchLeft(event) {
      
      
      // console.log(event)
      const newLeft = this.amountRight - 100;
      this.amountRight = newLeft;
      event.target.previousElementSibling.style.left = `${newLeft}px`;
    },
    switchRight(event) {
      const newRigth = this.amountRight + 100;
      this.amountRight = newRigth;
      event.target.previousElementSibling.previousElementSibling.style.left = `${newRigth}px`;
   
    },

    // switchLeft(event){
    //   console.log(event.target.previousElementSibling)
    //   var sliders = document.querySelector('.carouselbox');
    //   console.log(sliders)
    //   var sliders1 = event;
    //   // console.log(document.querySelector('.img-1').clientWidth)
    //   var img = document.querySelector('.img-1').clientWidth;
    //   var slidesClientWidth = document.querySelector('.carouselbox').clientWidth;
    //   // console.log('tamslider', slidesClientWidth)
    //   var ImagePadding = 20;
    //   var scrollPerClick = img + ImagePadding;
    //   // console.log('scrollPerClick',scrollPerClick)
    //   // console.log('sliders',sliders)
    //   console.log(this.scrollAmount)
    //   // sliders.scrollTo({
    //   //   top:0,
    //   //   left: -50,
    //   //   behavior:"smooth",
    //   // });
    //   sliders.scrollTo(200,0)
    //   if (this.scrollAmount<0){
    //     this.scrollAmount=0
    //   }
    // },

    // switchRight(){
    //   if (this.scrollAmount<= this.sliders.scrollWidth - this.sliders.clientWidth){
    //     this.sliders.scrollTo({
    //     top:0,
    //     left: (this.scrollAmount += this.scrollPerClick),
    //     behavior:"smooth",
    //   });
    //   }
    // },
  },
  created() {
    console.log('favoritos C:',this.favoritos),
    this.$axios
      .get(this.$store.state.BASE_URL + "/movies")
      .then((response) => {
        console.log("deu certo");
        console.log(response.data);
        this.moviesList = response.data;
        // console.log(this.moviesList[0]);
        // for (let i=1; i<=response.data.length; i++){
        //     console.log('console',response.data[i]);

        //     this.moviesList.push(response.data[i]);
        // }
        console.log("movielist", this.moviesList[0].poster);
        // this.$store.dispatch("SET_MOVIE", this.moviesList);
      })
      .catch((error) => {
        console.log("deu merda");
        console.log(error);
      });
  },
  // mounted() {
  //   document.querySelector(".img-1").clientWidth + 20;

  // }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
}
.estrelas {
  width: 100px;
  margin-left: 15px;
}
.cards {
  height: 100%;
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
p {
  color: #a4a4a4;
  font-size: 20px;
}
.conteudo {
  top: 2px;
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-left: 15px;
}
button {
  width: 150px;
  border: none;
  background-color: #e4e3e2;
  border-radius: 5px;
}
.classificacao {
  display: flex;
  width: 530px;
}
#demo {
  width: 200px;
  margin-left: 200px;
  margin-right: 200px;
}
.bbrigthness {
  top: 0;

  background-color: rgba(0, 0, 0, 0.5);
  width: 45%;
  height: 100%;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.InfoFixa {
  display: flex;
  flex-direction: row;
}
</style>
