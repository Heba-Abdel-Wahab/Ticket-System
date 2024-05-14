<template>
    <div class="frame">
        <Ticket/>
    </div>  
</template>

<script>
import Ticket from '../components/TheNewTicket.vue'
export default{
    components:{
        Ticket,
    }
}
</script>

<style>
.frame {
  margin: auto;
  width: 50%;
  border: 1px solid black;
  padding: 10px;
}
</style>