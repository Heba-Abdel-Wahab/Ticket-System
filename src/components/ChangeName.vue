<template>
  <Form @submit="changeName" :validation-schema="schema">
    <div class="form-group">
      <div>Benutzername</div>
      <!-- <label for="oldname">Altes Passwort</label> -->
      <Field name="oldname" type="text" class="form-control" />
      <ErrorMessage name="oldname" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Namen ändern</span>
      </button>
    </div>
    <div class="form-group">
      <div v-if="message" :class="error ? 'error' : 'success'">
        {{ message }}
      </div>
    </div>
  </Form>
</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ChangeName",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      oldname: yup.string().required("Ist ein Pflichtfeld!"),
      // .required(this.$t("login.error.username_required")),
    });
    return {
      loading: false,
      message: "",
      error: false,
      schema,
    };
  },
  methods: {
    changePassword(data) {
      this.loading = true;
      UserService.changePassword(data.oldpassword, data.newpassword).then(
        (response) => {
          this.loading = false;
          if (response.data.status === "FAIL") {
            this.error = true;
          }

          this.message = response.data.message;
        }
      );
    },
  },
};
</script>
