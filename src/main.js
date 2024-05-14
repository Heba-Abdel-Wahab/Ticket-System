import { createApp } from "vue";
import App from "./App.vue";

import "./index.css";

// Vue-Router
import router from "./router";

// Vuex
import store from "./store";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faAnglesLeft,
  faHouse,
  faBookOpen,
  faUser,
  faI,
  faCircleExclamation,
  faEdit,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAnglesLeft,
  faHouse,
  faBookOpen,
  faUser,
  faI,
  faCircleExclamation,
  faEdit,
  faBlog
);

// Localization
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "de",
  messages: {
    de: {
      admin: {
        panel: "Adminbereich",
      },
      link: {
        home: "Startseite",
        glossary: "Glossar",
        editor: "Editor",
        blog: "Blog",
      },
      user: {
        username: "Benutzername",
        password: "Passwort",
        email: "E-Mail",
        profile: "Profil",
        settings: "Einstellungen",
      },
      login: {
        login: "Einloggen",
        error: {
          username_required: "Benutzername ist ein Pflichtfeld!",
          password_required: "Passwort ist ein Pflichtfeld!",
        },
      },
      signup: {
        signup: "Registrieren",
        error: {
          username_required: "Benutzername ist ein Pflichtfeld!",
          email_required: "E-Mail ist ein Pflichtfeld!",
          password_required: "Passwort ist ein Pflichtfeld!",
        },
      },
    },
    en: {
      admin: {
        panel: "Admin-Area",
      },
      link: {
        home: "Homepage",
        glossary: "Glossary",
        editor: "Editor",
        blog: "Blog",
      },
      user: {
        username: "Username",
        password: "Password",
        email: "Email",
        profile: "Profile",
        settings: "Settings",
      },
      login: {
        login: "Login",
        error: {
          username_required: "Username is required!",
          password_required: "Password is required!",
        },
      },
      signup: {
        signup: "Sign Up",
        error: {
          username_required: "Username is required!",
          email_required: "Email is required!",
          password_required: "Password is required!",
        },
      },
    },
  },
});

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(i18n)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

app.config.globalProperties.$hostname = "http://132.195.97.143:8080";
