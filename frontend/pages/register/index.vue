<template>
  <div class="main">
    <div class="background" style="background-image: url('https://i.pinimg.com/originals/2f/88/a9/2f88a9427474343f7275e3b8f6fcc2e1.jpg'); background-size: cover; background-repeat: no-repeat; width:100%; height:100%;  padding-left:60px; padding-top:20px; filter: brightness(50%);"></div>
    <div class="conteudo">
        <img src="manflix.png" alt="logo" style="width:10%; height:100%">
        <div class="divForm">
          <form class="formCad">
            <p class="h2F">Sign up now</p>
            <InputText placeholder="Full name" v-model="user.fullName"/>
            <InputText placeholder="User" v-model="user.username"/>
            <InputText placeholder="Email" v-model="user.email"/>
            <InputText placeholder="Phone" v-model="user.phone"/>
            <InputText placeholder="Password" v-model="user.password"/>
            <InputText placeholder="Confirm Password" v-model="user.passConfirm"/>
            <div class="btnMenu">
              <Button class="teste" width="100px" label="Sign Up" v-on:click="sendRegister()"/>
            </div>
          </form>
        </div>
        <div class="footer">
          <div class="contFooter">
            <p>Dúvidas? Ligue 0800-761-4631</p>
            <div class="paragrafo">
              <p>Perguntas frequentes</p>
              <p>Centro de ajuda</p>
              <p>Termos de uso</p>
              
            </div>
            <div class="paragrafo">
            <p>Privacidade</p>
              <p>Preferências de cookies</p>
              <p>Informações corporativas</p>
            </div>
          </div> 
</div>
    </div>    
  </div>  
</template>

<script>

export default {
  name: "IndexPage",
  data(){
    return{
      user:{
        fullName: "",
        username: "",
        password: "",
        passConfirm: "",
        email: "",
        phone: "",
        idUser: 0,
      }
    }
  },
  methods:{
    sendRegister: function () {
      console.log(this.user);
      if (this.user.password === this.user.passConfirm) {
        this.registerUser();
      }
    },
    registerUser: async function () {
      const body = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email,
      };

      this.$axios
        .post(this.$store.state.BASE_URL + "/api/v1/users/", body)
        .then((response) => {
          console.log("cadastro do user ok");
          console.log(response);
          this.user.idUser = response.data.id;
          this.registerUsuarios();
        })
        .catch((error) => {
          console.log("cadastro do user ERRADO!");
          console.log(error);
          this.user = null;
        });
    },
    registerUsuarios: async function () {
      const body = [{
        nome: this.user.fullName,
        idUser: this.user.idUser,
        email: this.user.email,
        fone: this.user.phone,
        ativo: false,
        foto: null
      }];

      this.$axios
        .post(this.$store.state.BASE_URL + "/usuarios/", body)
        .then((response) => {
          console.log("cadastro do USUARIO ok");
          console.log(response);
          alert("CRIADO COM SUCESSO");
          $auth.logout();
        })  
        .catch((error) => {
          console.log("cadastro do USUARIO ERRADO!");
          console.log(error);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
  @import "@/layouts/scss/reset.scss";
img{
  margin-left:50px;
  margin-top:20px;
}
.footer{
  background-color: rgba(0,0,0,.75);
  height: 117px;
  margin-top:50px;
  color: white;

  p{
    padding-top:20px;
  }
}
.paragrafo{
  font-size:12px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.contFooter{
  padding-left:20%;
  padding-right:20%;
  right:20%;
  word-wrap: normal;
}
.main{
  width:100vw;
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
}
.conteudo{
    position: absolute; 
    top: 2px;

}
.divForm{
    margin-top:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.formCad{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0,0,0,.75);
    height: 660px;
    width: 450px;
}
.formCad > input{
    width: 320px;
    height:50px;
    margin-top:10px;
    border-radius:5px;
    border:none;
    background-color: #333;
    color: white;
    font-size:15px;
    padding-left:20px;

}
.h2F{
    color:white;
    font-size:35px;
    font-weight: bold;
    text-align: center;
    padding-right:160px;
    padding-left:50px;
    font-family: 'Arial';
    padding-top:50px;
    padding-bottom:20px;
}
.btnMenu{
    margin-top:50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 320px;
    height:50px;
    border-radius:10px;
}
.teste{
  width: 320px;
  height:50px;
  border-radius:5px;
  background-color:red;
  color:white;
  font-weight: bold;
  font-size: 15px;
}

</style>
