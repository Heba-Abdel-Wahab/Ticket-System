<template>
    <div class="container">
        <div class="navbar">
        <div>
        <input class="search-container" name="search" type="text" placeholder="Search Ticket" v-model="filter.search"/>
            <label class="topnav-label" for="category">Category: </label>
            <select class="topnav-select" name="category" v-model="filter.category">
                <option value="">All</option>
                <option v-for="category in categories" :value="category" :key="category">
                {{ category }}
                 </option>
            </select>
            <label class="topnav-label" for="Status">Status: </label>
            <select class="topnav-select" name="status" v-model="filter.status">
            <option value="">All</option>
            <option v-for="ticketstatus in status" :value="ticketstatus" :key="ticketstatus">
                    {{ ticketstatus }}
            </option>
        </select>      
        </div>
        </div>
        <table id="tickets-list">
            <thead>
                <tr>
                    <th>Ticket ID</th>
                    <th>Titel</th>
                    <!-- <th>message</th> -->
                    <th>status</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in filterticket.reverse()" :key="ticket.id" @click="openTicket(ticket.id)">
                    <td>{{ ticket.id }}</td>
                    <!-- <td>{{ ticket.mail }}</td> -->
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.status }}</td>
                    <td>{{ ticket.category }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="!this.$store.state.ticket.status.loading">Lädt</div>
    </div>
</template>

<script>
import TicketService from "../services/ticket.service";

export default({
    name:'MyTicket',
    data(){
        return{
            filter:{
                category :'',
                status:'',
                search:'',
            },
            categories:[],
            status : ["NEW","IN_PROGRESS","PENDING","CLOSED"],

        }
    },
    computed:{
      myticket() {
        return this.$store.state.ticket.tickets;
    },
    filterticket(){
      return this.myticket.filter((ticket)=>{
        return ticket.category.match(this.filter.category)&&
               ticket.status.match(this.filter.status)
                && ticket.title.match(this.filter.search)
        })
    },
    },
    created() {
        this.categoriesList();
        this.LoadTicket();    
    },
    methods: {
      LoadTicket(){ 
        return this.$store.dispatch('ticket/fetchMyTicket')
      },
      openTicket(id){
            this.$router.push("/ticketoverview/"+id);
      },
      categoriesList() {
        TicketService.categoriesList().then((response) => {
           response.data.message.categories.forEach((element) => {
              this.categories.push(element);
        });
        if (response.data.status === "FAIL") {
            this.error = true;
        }},(error) => {
                this.message =(error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
            });
        },
      },
})
</script>

<style scoped>
.container {
  margin-left: 200px;
  width: 75%;
  border: 1px solid black;
  padding: 10px;
}

.navbar {
  overflow: hidden;
  background-color: #58b43a;
}
.topnav-select{
  float: left;
  font-size: 16px;
  color: white;
  text-align: left;
  padding: 14px 16px;
  display: block;
  cursor: pointer;
  background-color: #58b43a;
  border:none;
}
.topnav-label{
  float: left;
  margin-left:20px;
  font-size: 16px;
  color: white;
  padding: 14px 16px;
  text-align: center;
  display: block;

}
.search-container{
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: 1px solid #ccc; 
  float:right;
  margin-right:20px;
  width:30%;
}


.topnav-select:hover{
  background-color: #38a169;
}
.topnav-select > option {
  position: absolute;
  background-color: #58b43a;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  float: none;
  padding: 12px 16px;
  display: block;
  text-align: left;
}
.topnav-select option:hover{
  background-color: #38a169;;
}
#tickets-list {
  border-collapse: collapse;
  width: 100%;
  margin:0;
}
#tickets-list td, #tickets-list th {
  padding: 8px;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-right: 0px;

}

#tickets-list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #58b43a;
  color: white;
}

#tickets-list tr:hover {background-color: #b9dfad;}
</style>
