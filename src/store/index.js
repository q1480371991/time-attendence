import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        status: 0,
        studentid: "",
        id: "",
        name: "",
    },
    mutations: {
        loginrecord(state, datalist) {
            state.status = 1;
            state.studentid = datalist.studentid;
            state.id = datalist.id;
            state.name = datalist.name;


        },
        logoutrecord(state) {
            state.status = 0;

        },
    }
})

export default store