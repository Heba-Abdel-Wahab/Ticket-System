<template>
  <div>
    <UserService />
    Das ist dein Profil:
    <li>Name: {{ user.name }}</li>
    <li>E-Mail: {{ user.email }}</li>
    <li>Language: {{ user.language }}</li>
    <li>Avatar: {{ user.avatar }}</li>
  </div>
</template>

<script>
import UserService from "../../services/user/user.service.js";

export default {
  name: "GetUserInformation",
  components: {
    UserService,
  },
  data() {
    return {
      user: [],
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      UserService.getUserProfile().then((response) => {
        this.user = response.data.message;
        if (response.data.status === "FAIL") {
          this.error = true;
        }
      });
    },
  },
};
</script>
