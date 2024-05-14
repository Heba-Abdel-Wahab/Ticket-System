<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>
          <font-awesome-icon icon="i" />
        </div>
      </span>
      <span v-else>Intence</span>
    </h1>

    <SidebarLink to="Home" icon="house">
      {{ $t("link.home") }}
    </SidebarLink>
    <!-- <SidebarLink to="Glossary" icon="book-open">
      {{ $t("link.glossary") }}
    </SidebarLink> -->
    <span v-if="loggedIn">
      <SidebarLink to="Profile" icon="circle-exclamation">
        {{ $t("user.profile") }}
      </SidebarLink>
      <SidebarLink to="Settings" icon="circle-exclamation">
        {{ $t("user.settings") }}
      </SidebarLink>
    </span>
    <span v-else>
      <SidebarLink to="Login" icon="circle-exclamation">
        {{ $t("login.login") }}
      </SidebarLink>
      <SidebarLink to="Register" icon="circle-exclamation">
        {{ $t("signup.signup") }}
      </SidebarLink>
    </span>
   <!-- <SidebarLink to="TestImages" icon="edit">TestImages</SidebarLink>
    <SidebarLink to="Test" icon="edit">
      {{ Test }}
    </SidebarLink>-->
    <span v-if="isAdmin">
      <SidebarLink to="AdminPanel" icon="circle-exclamation">
        {{ $t("admin.panel") }}
      </SidebarLink>
    </span>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <font-awesome-icon icon="angles-left" />
    </span>
    <SidebarLink to="NewTicket" icon="edit">New Ticket</SidebarLink>
    <SidebarLink v-if="RolleAdmin" to="TicketList" icon="edit">Ticket List</SidebarLink>
    <SidebarLink to="MyTicket" icon="edit">My Ticket</SidebarLink>

  </div>
</template>

<script>
import SidebarLink from "./SidebarLink";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
// const faIcons = require("font-awesome-icons");

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
  data(){
    return {
      RolleAdmin:false, 
    }
  },

  // created() {
  //   // console.log(faIcons.getList().then(icons => console.log(icons)))
  //   let icons = faIcons.getList().then((icons) => {
  //     icons.map((icon) => {
  //       icon.id.includes("book") ? console.log(icon) : "";
  //     });
  //   });
  //   console.log(icons, typeof icons);
  // },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isAdmin() {
      if (this.$store.state.auth.user != null) {
        return this.$store.state.auth.user.roles == "ROLE_ADMIN";
      }
      return false;
    },
    currentUser(){
        return this.$store.state.auth.user;
    },
  },
  mounted() {
    if(!this.currentUser || this.currentUser.roles[0] !='ROLE_ADMIN'){
      return this.RolleAdmin = false;
    }
    else{
        return this.RolleAdmin = true;
    }

  },
};
</script>

<style>
:root {
  --sidebar-background-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;

  --border-radius: 0.25em;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: #58b43a;

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
