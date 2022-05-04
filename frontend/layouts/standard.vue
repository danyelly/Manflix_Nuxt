<template>
  <div>
    <header class="flex flex-row align-items-center justify-content-between">
      <!-- colocar this.$router quando for chamar no script -->
      <!-- <a v-on:click="$router.push('/home')">Home</a> -->
      <!-- <a v-on:click="$router.push('/about')">About</a> -->
      <button
        class="pi pi-bars btnHamburger"
        v-on:click="showSidebar = (showSidebar === true)? false: true"
      />      
      <button class="atavarbtn" v-on:click="popUpInfo = (popUpInfo === true)? false: true">
          <Avatar 
            class="avatarUser" 
            :image="$store.state.BASE_URL + $store.state.usuario.foto"
            size="xlarge" 
            shape="circle"
            v-if="$store.state.usuario.foto"
            />
          <Avatar
            class="avatarUser"
            image="https://p4.wallpaperbetter.com/wallpaper/346/493/314/cats-cat-wallpaper-preview.jpg"
            size="xlarge"
            shape="circle"
            v-else
          />
      </button>
    </header>

    <Sidebar
      :visible.sync="showSidebar"
      :dismissable="true"
      :baseZIndex="1000"
      :showCloseIcon="false"
      class="customSidebar"
    >
      <div
        v-for="(myButton, index) in buttonPopup"
        :key="index"
        class="btnContainer"
      >
        <button
          v-on:click="
            () => {
              if (myButton.path === 'logout') $auth.logout();
              else $router.push(myButton.path);
            }
          "
        >
          <i :class="myButton.icon" />
          <span>{{ myButton.name }}</span>
        </button>
      </div>
    </Sidebar>
    <div class="paddingPopUP">
      <Sidebar
            :visible.sync="popUpInfo"
            :dismissable="true"
            :baseZIndex="1000"
            :showCloseIcon="false"
            class="customPopUp"
            position="right"
        >

            <div class="infoPopUp">
              <Avatar 
                class="avatarUser" 
                :image="$store.state.BASE_URL + $store.state.usuario.foto"
                size="xlarge" 
                shape="circle"
                v-if="$store.state.usuario.foto"
              />
               <Avatar
                class="avatarUser"
                image="https://p4.wallpaperbetter.com/wallpaper/346/493/314/cats-cat-wallpaper-preview.jpg"
                size="xlarge"
                shape="circle"
                v-else
              />  
              <br>
              <b><p>{{$store.state.usuario.nome}}</p></b>
              <p>{{$store.state.usuario.email}}</p>
              <p>{{$store.state.usuario.fone}}</p>

              <hr class="hr1">
              <button v-on:click="$auth.logout()">Logout</button>
              <hr class="hr2">
            </div>
      </Sidebar>
    </div>
    
    <Nuxt />
    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,
      popUpInfo: false,
      buttonSidebar: [
        {
          icon: "pi pi-home",
          name: "Home",
          path: "/home",
        },
        {
          icon: "pi pi-info-circle",
          name: "About",
          path: "/about",
        },
        {
          icon: "pi pi-question-circle",
          name: "Help",
          path: "/help",
        },
        {
          icon: "pi pi-search",
          name: "Search",
          path: "/search",
        },
        {
          icon: "pi pi-sign-out",
          name: "Logout",
          path: "logout",
        },
      ],
    };
  },
  methods: {},
  created() {    
    console.log(this.$auth);
    this.$axios
      .get( this.$store.state.BASE_URL + "/usuarios?user=" + this.$auth.$state.user.id)
      .then((response) => {
        console.log("deu certo");
        console.log(response.data[0]);
        
        //aciona a action!
        this.$store.dispatch("SET_USER", response.data[0]);

      })
      .catch((error) => {
        console.log("deu merda");
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
$height-header: 80px;

header {
  width: 100vw;
  height: $height-header;
  background-color:black;
  color: white;

  .avatarUser {
    margin-right: 30px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      transform: scale(1.1);
      transition: 0.5s;
    }
  }
  .atavarbtn{
        border:none;
        width: 100px;
        background-color:  black;
    }

  .btnHamburger {
    background-color: black;
    color: white;
    border: none;
    width: 30px;
    height: 70%;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      background-color: var(--background-header-hover);
    }
  }
}

.customSidebar {
  width: 10vw;
  height: calc(100vh - $height-header);
  display: absolute;
  top: $height-header;
  left: 0;
  background-color: var(--background-sidebar);

  .btnContainer {
    width: 100%;
    height: 60px;
    // background-color: yellow;
    margin-top: 20px;

    button {
      background-color: var(--background-sidebar);
      border: 0;
      color: rgb(235, 219, 219);
      font-size: 25px;
      cursor: pointer;
      i {
        font-size: 25px;
      }
      &:hover {
        background-color: var(--background-sidebar-hover);
      }
    }
  }
}
.paddingPopUP{
  padding-right: 200px;
  width: 500px;
  background-color: green;
}
.customPopUp {
  width: 25vw;
  top:80px;
  right: 20px;
  height: calc(70vh - $height-header);
  display: relative;
  padding-right: 2000;
  border-radius: 10px;
  // background-color: var(--background-sidebar);
  background-color: white;

  .infoPopUp{
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    button{
      width: 70px;
      height: 30px;
      margin-top:10px;
      border-radius: 5px;
      border: 1px solid black;
    }
    .hr1{
      margin-top:45px;
    }
    .hr2{
      margin-top:10px;
    }
  }
}
</style>
