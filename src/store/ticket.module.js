import TicketService from "../services/ticket.service"
const tickets = [];

const initialState = tickets
  ? { status: { loading: true }, tickets }
  : { status: { loading: false }, tickets: null };

 

export const ticket = {
  namespaced: true,
  state: initialState,
  getters: {
    tickets: state => {
        return state.tickets;
    },
  },
  actions: {
     fetchTicket({ commit }) {
        return TicketService.listTickets().then(
        (res) => {
          console.log(res)
          commit("loadingSuccess", res.data.message.tickets);
          return Promise.resolve(tickets);
        },
        (error) => {
          commit("loadingFailure");
          return Promise.reject(error);
        }
      );
    },
    fetchMyTicket({ commit }) {
      return TicketService.myticket().then(
      (res) => {
        console.log(res)
        commit("loadingSuccess", res.data.message.tickets);
        return Promise.resolve(tickets);
      },
      (error) => {
        commit("loadingFailure");
        return Promise.reject(error);
      }
    );
  },
  },
  mutations: {
    loadingSuccess(state, tickets) {
      state.status.loading = true;
      state.tickets = tickets;
    },
    loadingFailure(state) {
      state.status.loading = false;
      state.tickets = null;
    },
  },
};
