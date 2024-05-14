<template>
  <AdminService />
  <div v-for="role in roles" :key="role.id" class="gallery-panel">
    {{ role }}
  </div>
</template>

<script>
import AdminService from "../../../services/admin/admin.service.js";

export default {
  name: "GetUserRoles",
  props: ["usermail"],
  components: {
    AdminService,
  },
  data() {
    return {
      roles: [],
    };
  },
  created() {
    this.getUserRoles(this.usermail);
  },
  methods: {
    getUserRoles(data) {
      AdminService.getUserRoles(data).then((response) => {
        this.roles = response.data.message.roles;
        console.log(this.roles);
        if (response.data.status === "FAIL") {
          this.error = true;
        }
      });
    },
  },
};
</script>
