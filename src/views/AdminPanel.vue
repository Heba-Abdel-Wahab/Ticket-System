<template>
  <div class="frame">
    <div>
      Verify users:
      <ListUnverifiedUsers />
    </div>
    <div>
      Set role:
      <ListVerifiedUsers />
    </div>
  </div>
</template>

<script>
import ListUnverifiedUsers from "../components/Admin/Verify/ListUnverifiedUsers.vue";
import ListVerifiedUsers from "../components/Admin/SetRole/ListVerifiedUsers.vue";

export default {
  components: {
    ListUnverifiedUsers,
    ListVerifiedUsers,
  },
};
</script>

<style scoped>
.frame {
  margin: auto;
  width: 25%;
  border: 1px solid black;
  padding: 10px;
}
</style>
