<template>
  <hr />
  <div>
    Hier könnten Deine Daten stehen ...
    <div class="frame">Test Daten ...</div>
    <GetUserInformation />
  </div>
  <hr />
</template>

<script>
import GetUserInformation from "../components/User/GetUserInformation.vue";

export default {
  components: {
    GetUserInformation,
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
