export default {
    SET_USER(context, payload){
        console.log("vuex:" + payload);
        context.commit("USER", payload);
    },
    SET_MOVIE(context, payload){
        console.log("movieAction1:" + payload);
        context.commit("MOVIE", payload);
    }
}