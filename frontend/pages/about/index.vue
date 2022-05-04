<template>
    <div>
        <h1>TELA ABOUT</h1>
        <p>Nome: {{ $store.state.usuario.nome }}</p>
        <p>Fone: {{ $store.state.usuario.fone }}</p>
        <p>E-mail: {{ $store.state.usuario.email }}</p>
    </div>
</template>

<script>
export default {
    name: "about",
    middleware: "auth",
    layout: "standard"

}
</script>

<style lang="scss" scoped>


</style>