<template>
  <div
    @click="handleLogout"
    class="rounded-full absolute top-5 right-5 z-40 bg-zinc-500"
  >
    <div>
      <font-awesome-icon icon="user" size="lg" />
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.avatar {
  position: absolute;
  top: 15px;
  right: 15px;

  z-index: 990;

  background-color: rgba(80, 80, 80, 0.2);

  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #ccc;

  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-icon {
  z-index: 1000!;
}

.avatar:hover {
  background-color: rgba(80, 80, 80, 0.4);
}
</style>
