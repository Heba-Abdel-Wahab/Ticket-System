<template>
  <Form @submit="changePassword" :validation-schema="schema">
    <div class="form-group">
      <div>Altes Passwort</div>
      <!-- <label for="oldpassword">Altes Passwort</label> -->
      <Field name="oldpassword" type="password" class="form-control" />
      <ErrorMessage name="oldpassword" class="error-feedback" />
    </div>
    <div class="form-group">
      <div>Neues Passwort</div>
      <!-- <label for="newpassword">Neues Passwort</label> -->
      <Field name="newpassword" type="password" class="form-control" />
      <ErrorMessage name="newpassword" class="error-feedback" />
    </div>
    <div class="form-group">
      <div>Neues Passwort wiederholen</div>
      <!-- <label for="repeatpassword">Neues Passwort wiederholen</label> -->
      <Field name="repeatpassword" type="password" class="form-control" />
      <ErrorMessage name="repeatpassword" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Passwort ändern</span>
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
import UserService from "../services/user/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ChangePassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      oldpassword: yup.string().required("Ist ein Pflichtfeld!"),
      // .required(this.$t("login.error.username_required")),
      newpassword: yup.string().required("Ist ein Pflichtfeld!"),
      // .required(this.$t("login.error.password_required")),
      repeatpassword: yup
        .string()
        .oneOf(
          [yup.ref("newpassword"), null],
          "Passwörter stimmen nicht überein"
        ),
      // .required(this.$t("login.error.password_required")),
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
