<template>
    <div class="container">
        <div class="rightside">
            <div>
                <div class="rightside-item">
                <label for="Assigned">Assigned to : </label>
                <select name="Assigned" v-model="assigned">
                  <option v-for="admin in admins" :value="admin.id" :key="admin.id">
                  {{ admin.mail }}
                  </option>
                </select>
                <br/>
                <label for="status">Change status to : </label>
                <select name="status" v-model="ticket.status">
                  <option v-for="ticketstatus in status" :value="ticketstatus" :key="ticketstatus">
                    {{ ticketstatus }}
                  </option>
                </select>
                </div>
            </div>
        </div>
        <div class="leftside">
          <div class="ticket-header">
            <h1 class="title">{{ticket.title}}</h1>
            <span class="header-info">
                 <span class="mail"> from : {{ticket.mail}} </span>
                 <span class="category">category : {{ticket.category}}</span>
            </span>
          </div>
          <div class="chat">
            <div v-if="!successful">Lädt</div>
          <div class="chatbox" v-for="(message) in messages" :key="message.id">
                <div v-if="message.type==='message'"  class="my_messages">
                  <div class="absender">
                    <span class="mail">{{message.responsible.mail}}</span>
                    <!-- <span class="mail">{{ticket.mail}} </span> -->
                    <span>{{formatDate(message.timestamp)}}</span>
                  </div>
                  <p>{{message.message}}</p> 
                </div>
                <div v-if="message.type !='message'" class ="box">
                <hr>
                <div v-if="message.type=== 'assignment' " class="status ">
                   <p>{{message.responsible.mail}} assigned your ticket to admin {{message.assignment}} <span>{{formatDate(message.timestamp)}}</span> </p> 
                </div>
                 <div v-if="message.type=== 'status'" class="status" >
                   <p> Ticket status has been changed to {{message.status}} <span>{{formatDate(message.timestamp)}}</span> </p> 
                </div>
                <hr>
                </div>
            </div>
         
    <Form @submit="onSubmit" :validation-schema="schema">
    <div class="form">
        <Field name="reply" as="textarea" type="text" />
        <ErrorMessage name="reply" class="error-feedback"></ErrorMessage> 
      </div>  
      <div class="form-group">
      <button class="btn" :disabled="loading">
        <span>Send Reply</span>
      </button>
    </div>
    <div class="form-group">
      <div v-if="message" :class="error ? 'error' : 'success'">
        {{ message }}
      </div>
    </div>
    </Form>
    </div>
    </div>
    </div>
</template>

<script>
import TicketService from "../services/ticket.service";
import { Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";
import * as moment from 'moment';


export default {
    name: "TicketOverviewAdmin",
     components :{ 
       Form,Field,ErrorMessage
    },
  data() {
    const schema = yup.object().shape({
            reply:yup.string().required(this.getErrorMsg("message required")),
    });
    return {
      ticket: {},
      successful: '',
      error: false,
      assigned:"",
      admins:[],
      message:"",
      messages: [],//ticket messages content
      schema,
      id:this.$route.params.id,
      status : ["NEW","IN_PROGRESS","PENDING","CLOSED"],

    };
  },
  created() {
    this.getTicket();
    this.listAdmins();
  },
   watch:{
      assigned : function(){
          TicketService.assignedAdmin(this.assigned, this.id)
          .then((response) => {
                if (response.data.status === "FAIL") {
                  this.error = true;
                }
                this.message = response.data.message;
                this.successful = true;
              },
              (error) => {
                this.message =(error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
              }
          );;
      },
      'ticket.status': function(){
       TicketService.ChangeTicketStatus(this.id,this.replymessage,this.ticket.status)
       .then((response) => {
                if (response.data.status === "FAIL") {
                  this.error = true;
                }
                this.message = response.data.message;
                this.successful = true;
              },
              (error) => {
                this.message =(error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
              },
              this.$forceUpdate()
            );
       ;
     }
  },
  methods: {
    formatDate: function(value){
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm a')
      }
    },
    onSubmit(data){
        TicketService.ReplyTicket(this.id,data.reply,this.ticket.status)
        .then((response) => {
            console.log(response)
                if (response.data.status === "FAIL") {
                  this.error = true;
                }
                this.message = response.data.message;
                this.successful = true;
              },
              (error) => {
                this.message =(error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
              }
        );; 
    },
    getTicket() {
      TicketService.getTicketById(this.id).then((response) => {
          console.log(response)
          this.successful = true;
          this.ticket=response.data.message;
          response.data.message.content.forEach(element => {
              this.messages.push(element);             
          });
          },(error) => {
            this.message =(error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            this.successful = false;
          });
    },
    getErrorMsg(text) {
        return this.$t(text);
    }, 
    listAdmins(){
      TicketService.listAdmins().then(
        (response) => {
          if (response.data.status === "FAIL") {
            this.error = true;
        }
        response.data.message.admins.forEach(element => {
          this.admins.push(element);
          if(element.id===this.assigned){
            this.nameA=element.mail;
          }
        });
        },
        (error) => {
          this.message =(error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString();
          this.successful = false;
          console.log(error.response)
        });
    },
 
  },
};
</script>

<style scoped>
.container {
  margin-left: 200px;
  width: 80%;
  display: flex;
  border: solid 1px black;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06) 0 2px 5px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  flex-direction: row-reverse;
}

.container .leftside{
  flex:70%;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.rightside-item{
  display: flex;
  flex-direction: column;
  padding: 26px;

}

.rightside-item select{
  font-size: 16px;
  padding: 14px 16px;
  cursor: pointer;
}
.rightside-item label{
  font-size: 20px;
  color: white;
  padding: 30px 5px;
  text-align: left;
}
.container .rightside{
  flex:30%;
  position: relative;
  background-color: #58b43a;
  border-left: solid 1px rgba(0, 0, 0, 0.06);
}
.hr-header{
  width:100%;
}
.chat{
  width: 95%;
  margin: auto;
  padding:10px;
  height: auto;
}

.chatbox{
  position: relative;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.my_messages{
  position: relative;
  max-width:80%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  align-content: flex-start;

}
.my_messages .absender{
  width:auto;
  font-size: 0.6rem;
  padding: 3px;
  text-align: left;
}

.my_messages .absender .mail{
 margin-right: 10px;
 
}

.my_messages p{
  position: relative;
  max-width:80%;
  background-color: #58b43a;
  color: white;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.9rem;
  margin-top: 5px;
}

.my_messages p span{
  display:block;
  font-size:0.85rem;
  margin-top:5px;
  opacity: 0.5;
}
textarea {
  width: 85%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  
}
.reply{
    position: relative;
    max-width:80%;
    display: flex;
    flex-direction: column;
    padding: 5px;
    align-content: flex-end;
  }
.box {
  display: flex;
  width:100%;
}

hr {
  align-self: center;
  background: #58b43a;
  width: 40%; 
}

.chatbox .status{
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  border: 1px solid #58b43a;
  border-radius: 10px;
  font-size: 0.7rem;
}
.status p span{
  font-size:0.6rem;
  margin-top:5px;
  opacity: 0.5;
}
.ticket-header{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: #58b43a;
  color: white;
}

.usericon{
  width:50px;
  height: 50px;
  border:1px solid black;
  border-radius: 50%;
}
.header-info .mail{
  width:auto;
  padding: 10px;
}
.header-info .category{
  width:auto;
  padding: 5px;
  margin-left:10px;
}

.btn:hover {
    background-color: #238004;
}

.btn{
    background-color: #58b43a;
    color:white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>