<template>
    <div>
        <InputText
          class="w-full"
          type="text"
          placeholder="Nome"
          v-model="movie.movieName"
        />
        <InputText
          class="w-full"
          type="file"
          placeholder="Poster"
          v-model="movie.movieFile"
        />

        <Dropdown 
          v-model="selectedCategory" :options="category" 
          optionLabel="name" 
          placeholder="Categoria" 
        />     
        <Button label="Cadastrar" v-on:click="cadastrar()" />
    </div> 
</template>

<script>
export default {
  middleware: "auth",
  name: "IndexPage",
  data() {
    return {
      movie:{
        movieName:"",
        movieFile:"",
      },
      selectedCategory: null,
      category: [
        {name: 'Ação'},
        {name: 'Comédia'},
        {name: 'Suspense'},
        {name: 'Terror'},
        {name: 'Romantico'},
        {name: 'Musical'}
      ]
      };
  },
  methods: {
    cadastrar: function () {
      console.log(this.movie.movieName);
      console.log(this.movie.movieFile);
      console.log(this.selectedCategory.name);
      this.registerMovie();
    },

    registerMovie: async function () {
      const body = {
        name: this.movie.movieName,
        poster: this.movie.movieFile,
        category: this.selectedCategory.name,
      };

      this.$axios
        .post(this.$store.state.BASE_URL + "/movies/", body)
        .then((response) => {
          console.log("cadastro do filme ok");
          console.log(response);
          this.registerMovie();
        })
        .catch((error) => {
          console.log("cadastro do filme ERRADO!");
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/layouts/scss/reset.scss";
</style>
