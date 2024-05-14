<template>
<div>
  <div v-if="IsAdmin"> 
     <TicketOverviewAdmin/>
  </div>
  <div v-else>  
    <TicketOverviewUser/>
  </div>
</div>
</template>

<script>
import TicketOverviewAdmin from "../components/TicketOverviewAdmin.vue";
import TicketOverviewUser from "../components/TicketOverviewUser.vue";

//Ticketübersichet
export default {
  name: "TicketOverview", 
  components: {
    TicketOverviewAdmin,
    TicketOverviewUser,
  },
  data() {
    return {
      IsAdmin:false, 
    };
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
