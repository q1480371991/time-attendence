import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        status: 0,
        studentid: "",
        id: "",
        name: "",
        starttime: "",
        mycenter: [],
        in_five_building: false,
        in_wisdom_valley: false,
    },
    mutations: {
        loginrecord(state, datalist) {
            state.status = 1;
            state.studentid = datalist.studentid;
            state.id = datalist.id;
            state.name = datalist.name;
            state.starttime = datalist.startTime;
        },
        logoutrecord(state) {
            state.status = 0;
        },
        recordposition(state, pos) {
            state.mycenter[0] = pos.KL;
            state.mycenter[1] = pos.kT;
        },
        recordin(state, data) {
            console.log(data);
            state.in_five_building = data[0];
            state.in_wisdom_valley = data[1];
        }
    }
})

export default store