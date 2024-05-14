<template>
  <Form @submit="handleLogin" :validation-schema="schema">
    <div class="form-group">
      <div>{{ $t("user.username") }}</div>
      <!-- <label for="username">{{ $t("user.username") }}</label> -->
      <Field name="username" type="text" class="form-control" />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <div>{{ $t("user.password") }}</div>
      <!-- <label for="password">{{ $t("user.password") }}</label> -->
      <Field name="password" type="password" class="form-control" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>{{ $t("login.login") }}</span>
      </button>
    </div>
    <div class="form-group">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required(this.$t("login.error.username_required")),
      password: yup.string().required(this.$t("login.error.password_required")),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
