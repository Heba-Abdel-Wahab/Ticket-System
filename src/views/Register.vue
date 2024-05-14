<template>
  <div class="frame">
    <Register />
  </div>
</template>

<script>
import Register from "../components/TheRegister.vue";

export default {
  components: {
    Register,
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
