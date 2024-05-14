<template>
  <div class="gallery">
    <button @click="verifyUserManually(usermail)">
      <span> verifizieren! </span>
    </button>
  </div>
  <div v-if="message" class="alert alert-message" role="alert">
    {{ message }}
  </div>
</template>

<script>
import AdminService from "../../../services/admin/admin.service";

export default {
  name: "VerifyUserManually",
  props: ["usermail"],
  data() {
    return {
      error: false,
      message: "",
    };
  },
  methods: {
    verifyUserManually(data) {
      AdminService.verifyUserManually(data).then((response) => {
        if (response.data.status === "FAIL") {
          this.error = true;
        }
        this.message = response.data.message;
      });
    },
  },
};
</script>
