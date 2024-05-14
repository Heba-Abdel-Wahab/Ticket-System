<template>
  <div class="gallery">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>verify</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="gallery-panel">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.mail }}</td>
          <td>
            <VerifyUserManually :usermail="user.mail" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminService from "../../../services/admin/admin.service";
import VerifyUserManually from "./VerifyUserManually.vue";

export default {
  name: "ListUnverifiedUsers",
  components: {
    VerifyUserManually,
  },
  data() {
    return {
      users: [],
      error: false,
    };
  },
  created() {
    this.listUnverifiedUsers();
  },
  methods: {
    listUnverifiedUsers() {
      AdminService.listUnverifiedUsers().then((response) => {
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
