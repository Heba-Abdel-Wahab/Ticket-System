<template>
<div class="form-gruppe">
     <h1>New Ticket</h1>
     <Form @submit="onSubmit" :validation-schema="schema">
      <div class="form">
        <span v-if="loggedIn">
          <label for="mail"  >Email :<span class="text-danger">*</span> </label>
          <Field name="mail" type="email" v-model="mail" disabled></Field>
        </span>
        <span v-else>
          <label for="mail"  >Email<span class="text-danger">*</span> </label>
          <Field name="mail" type="email" ></Field>
          <ErrorMessage name="mail" class="error-feedback" ></ErrorMessage> 
        </span>

        <span v-if="loggedIn">
          <label for="name"  >Name<span class="text-danger">*</span> </label>
          <Field name="name" type="text"  v-model="mail"  disabled></Field>
        </span>
        <span v-else>
          <label for="name"  >Name<span class="text-danger">*</span> </label>
          <Field name="name" type="text" ></Field>
          <ErrorMessage name="name" class="error-feedback"></ErrorMessage> 
        </span>       
      </div>

      <div class="form">
        <label for="category" >Category <span class="text-danger">*</span> </label>
        <br/>
        <Field name="category" as="select" id="category" >
          <option v-for="category in categories" :value="category" :key="category">
             {{ category }}
          </option>
        </Field>
           <ErrorMessage name="category" class="error-feedback"></ErrorMessage>
      </div>

       <div class="formtitel">
          <label for="title" >Title<span class="text-danger">*</span></label>
          <br/>
          <Field name="title" type="text"  ></Field>
          <ErrorMessage name="title" class="error-feedback"></ErrorMessage>
      </div>

      <div class="formmessage">
        <label for="messageF" >Message <span class="text-danger">*</span> </label>
        <br/><br/>
        <Field name="messageF" as="textarea" type="text" />
        <ErrorMessage name="messageF" class="error-feedback"></ErrorMessage> 
      </div> 
       
      <!-- <label>Attachment
        <input type="file" id="Anhang" ref="Anhang" multiple v-on:change="handleAttachmentUpload()"/>
      </label> -->
      <div class="form-group">
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Senden</span>
      </button>
    </div>
    <div class="form-group">
      <div v-if="message" :class="error ? 'error' : 'success'">
        {{ message }}
      </div>
    </div>
    </Form>
</div>
</template>

<script>

import TicketService from "../services/ticket.service";
import UserService from "../services/user/user.service.js";
import { Form, Field, ErrorMessage} from "vee-validate";
import * as yup from "yup";

export default ({
    name:"NewTicket",
     components :{ 
       Form,Field,ErrorMessage
    },
    data(){
       const schema = yup.object().shape({
            title:yup
                 .string()
                 .required(this.getErrorMsg("Titel required"))
                 .max(40,"must be a maximum of 40 characters long!"),
            mail:yup
                 .string()
                 .required(this.getErrorMsg("email required"))
                 .email("Email is invalid")
                 .max(50, "Must be a maximum  50 characters!"),
            category:yup.string().required(),
            messageF:yup.string().required(this.getErrorMsg("message required")),
            name:yup.string().required(this.getErrorMsg("Name required")),
            });
           return{
                schema,
                successful: false,
                message: "",
                error: false,
                categories:[],
                mail:"",
                //Anhang: '',

             };
        },
        methods: {
          onSubmit(data){
            if(this.loggedIn){
              this.createNewTicket(data)
            }
            else{
              this.createNewPublicTicket(data)
            }
          
          },
          createNewTicket(data) {
            TicketService.createNewTicket(data).then(
              (response) => {
                if (response.data.status === "FAIL") {
                  this.error = true;
                }
                this.message = response.data.message;
                this.successful = true;
                this.$router.push("/myticket");
              },
              (error) => {
                this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
              }
            );
          },
          createNewPublicTicket(data) {
            TicketService.createNewPublicTicket(data).then(
              (response) => {
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
            );
          },
          categoriesList() {
            TicketService.categoriesList().then((response) => {
              if (response.data.status === "FAIL") {
                this.error = true;
              }
              response.data.message.categories.forEach((element) => {
                this.categories.push(element);
              }); 
            },(error) => {
                this.message =(error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
              }
            );
          },
           getErrorMsg(text) {
                 return this.$t(text);
            }, 
             getUserProfile() {
              UserService.getUserProfile().then((response) => {
                if (response.data.status === "FAIL") {
                  this.error = true;
                }
                this.mail = response.data.message.email;
              },(error) => {
                this.message =(error.response && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString();
                this.successful = false;
              }
              );
            },
            // handleAttachmentUpload(){
            // this.Anhang = this.$refs.Anhang.Anhang;
            // },
            // SendFiles(){
            //    let formData = new FormData();
            //    for(i = 0; i < this.Anhang.length; i++ ){
            //    let file = this.Anhang[i];
            //    formData.append('Anhang[' + i + ']', file);
            //    }//route muss im Backend definiert werden
            //    axios.post(this.$hostname + "/api/....", formData,
            //       {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //             ...authHeader(),
            //             ...langHeader(),
            //         }
            //       }
            //     ).then((res)=>{
            //       console.log(res);
            //     })
            //     .catch((res)=>{
            //       console.log(res);
            //     });
            //   },
        },
        computed:{
            loggedIn(){
              return this.$store.state.auth.status.loggedIn;
            }, 
        },     
        created(){
          this.categoriesList();
          this.getUserProfile();
        },

        
 })
</script>

<style scoped>
.form {
    margin: 10px;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: left;
}
label{
    padding-left: 15px;
    padding: 16px;
}

.form input[type=text]  {
    padding: 8px 11px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.formtitel{
  display: flex;
}
.formtitel input[type=text]  {
    width: 80%;
    padding: 8px 11px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
.formmessage{
  display: flex;
  
}
.form select  {
    width: 50%;
    padding: 8px 11px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.form input[type=email] ,input[type=date]{
    padding: 8px 11px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
  
}

.btn:hover {
  background-color: #238004;
}

.btn{
    width: 50%;
    background-color: #58b43a;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

.form-gruppe {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}

</style>