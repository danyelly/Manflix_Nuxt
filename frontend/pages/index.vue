<template>
  <div class="main">
    <div class="background" style="background-image: url('https://i.pinimg.com/originals/2f/88/a9/2f88a9427474343f7275e3b8f6fcc2e1.jpg'); background-size: cover; background-repeat: no-repeat; width:100%; height:100%;  padding-left:60px; padding-top:20px; filter: brightness(50%);"></div>
    <div class="conteudo">
        <img src="manflix.png" alt="logo" style="width:10%; height:100%">
        <div class="divForm">
          <form class="formCad">
            <p class="h2F">Sign In</p>
            <InputText placeholder="Email or phone number" v-model="user.username"/>
            <InputText type="password" placeholder="Password" v-model="user.password"/>
            <div class="btnMenu">
              <Button class="teste" width="100px" label="Sign In" v-on:click="sendLogin()"/>
            </div>
            <a v-on:click="$router.push('/register')">Criar conta</a>
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
        username: '',
        password: ''
      }
    }
  },
  methods:{
    sendLogin: function(){
      console.log(this.user.username);
      console.log(this.user.password);
      if(this.user.username && this.user.password)
      {
        this.$auth.loginWith(
          "local", {data: this.user}
        ).then(()=>{
          alert("Usuário logado!");
        })
      }
      else{
        alert("Preencha os campos necessário seu Otário!");
      }
    }
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
    padding-right:250px;
    padding-left:50px;
    font-family: 'Arial';
    padding-top:50px;
    padding-bottom:20px;
}
a{
  color:#b3b3b3;
  margin-top:30px;
  display: flex;
  justify-content:flex-end;
  text-align: right;
  padding-right: 65px;
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
