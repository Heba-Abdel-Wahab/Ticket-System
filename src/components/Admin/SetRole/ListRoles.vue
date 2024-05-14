<template>
  <div class="gallery"></div>
</template>

<script>
import AdminService from "../../../services/admin/admin.service";

export default {
  name: "ListRoles",
  data() {
    return {
      roles: [],
    };
  },
  emits: ["response"],
  created() {
    this.listRoles();
    this.$emit("response", this.roles);
  },
  methods: {
    listRoles() {
      AdminService.listRoles().then((response) => {
        response.data.message.roles.forEach((element) => {
          this.roles.push(element);
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
