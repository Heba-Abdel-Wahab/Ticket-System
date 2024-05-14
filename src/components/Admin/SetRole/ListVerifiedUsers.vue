<template>
  <ListRoles @response="(msg) => (roles = msg)" />
  <div class="gallery">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>roles</th>
          <th>new role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="gallery-panel">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>
            <GetUserRoles :usermail="user.mail" />
          </td>
          <td>
            <RolesDropdown :rolenames="roles" :usermail="user.mail" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminService from "../../../services/admin/admin.service";
import ListRoles from "./ListRoles.vue";
import GetUserRoles from "./GetUserRoles.vue";
import RolesDropdown from "./RolesDropdown.vue";

export default {
  name: "ListVerifiedUsers",
  components: {
    ListRoles,
    GetUserRoles,
    RolesDropdown,
  },
  data() {
    return {
      users: [],
      roles: [],
    };
  },
  created() {
    this.listVerifiedUsers();
  },
  methods: {
    listVerifiedUsers() {
      AdminService.listVerifiedUsers().then((response) => {
        response.data.message.users.forEach((element) => {
          this.users.push({
            id: element.id,
            name: element.name,
            mail: element.mail,
          });
        });
        if (response.data.status === "FAIL") {
          this.error = true;
        }
      });
    },
  },
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
