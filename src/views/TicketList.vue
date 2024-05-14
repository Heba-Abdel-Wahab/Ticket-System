<template>
  <div>
  <div v-if="IsAdmin"> 
    <ListTicket/>
  </div>
</div>
</template>

<script>
import ListTicket from "../components/ListTicket.vue";

export default {
  name: "TicketList",
  components: {
    ListTicket,
  },
  data(){
    return{
      IsAdmin:false, 
    }
  },
  computed:{
    currentUser(){
        return this.$store.state.auth.user;
    },
  },
  mounted() {
    if(!this.currentUser || this.currentUser.roles[0] !='ROLE_ADMIN'){
      return this.IsAdmin = false;
    }
    else{
        return this.IsAdmin = true;
    }
  },
};
</script>
