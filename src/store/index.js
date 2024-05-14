import { createStore } from "vuex";

import { auth } from "./auth.module";
import { ticket } from "./ticket.module";


export default createStore({
  state: {},
  mutations: {},
  actions: {},

  modules: {
    auth,ticket,
  },
});
