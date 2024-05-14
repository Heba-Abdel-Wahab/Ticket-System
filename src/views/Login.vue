<template>
  <div class="frame">
    <Login />
  </div>
</template>

<script>
import Login from "../components/TheLogin.vue";

export default {
  components: {
    Login,
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
