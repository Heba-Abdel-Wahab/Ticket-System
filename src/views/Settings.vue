<template>
  <hr />
  <div>
    Hier kannst Du Dein Passwort ändern
    <div class="frame">
      <ChangePassword />
    </div>
  </div>
  <hr />
  <div>
    Hier kannst Du die Sprache ändern
    <div class="locale-changer frame">
      <select v-model="$i18n.locale">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
  </div>
  <hr />
</template>

<script>
import ChangePassword from "../components/ChangePassword.vue";

export default {
  components: {
    // Profile,
    ChangePassword,
  },
  setup() {},
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
