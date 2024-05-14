<template>
  <div class="role-changer frame">
    <select
      @change="setRoleForUserManually(usermail, $event)"
      v-model="selectedValue"
    >
      <option
        v-for="rolename in rolenames"
        :key="`role-${rolename.role}`"
        :value="rolename.role"
      >
        {{ rolename.role }}
      </option>
    </select>
    <div v-if="message" class="alert alert-message" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<script>
import AdminService from "../../../services/admin/admin.service";

export default {
  name: "RolesDropdown",
  props: ["rolenames", "usermail"],
  data() {
    return {
      selectedValue: 0,
      error: false,
      message: "",
    };
  },
  methods: {
    setRoleForUserManually(usermail, event) {
      AdminService.setRoleForUserManually(usermail, event.target.value).then(
        (response) => {
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
