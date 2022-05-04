 export default {

    USER(state, payload){
        state.usuario = payload;
    },
    MOVIE(state, payload){
        state.moviesApi = payload;
    }
 }