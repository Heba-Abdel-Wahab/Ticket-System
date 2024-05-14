<template>
  <h2>Testseite</h2>
  <div>Test inhalt ... auf der Testseite ...</div>
  <br /><br /><br /><br />
  <div id="upload-area">
    <div id="preview-div">
      <img id="preview-image" />
    </div>
    <input
      type="file"
      accept="image/svg+xml, image/jpeg, image/png"
      @change="uploadImage($event)"
      id="file-input"
      data-multiple-caption="{count} files selected"
      multiple
    />
    <label id="file-input-label" for="file-input">Datei auswählen ...</label>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "@/services/auth-header";
import langHeader from "../services/lang-header";
// // import authHeader from "../services/auth-header.js";

// let Stomp = require("@stomp/stompjs");
// // var Stomp = require('stompjs');
// // let SockJS = require('sockjs');

// // let stompClient = null;

// // const API_URL = "wss://132.195.97.143:8080/ide/";

// // let connectCallback = function () {
// //   // called back after the client is connected and authenticated to the STOMP server

// //   console.log("Succesfully connected");
// // };

export default {
  // created() {
  //   var socket = new SockJS('/ide');
  //   stompClient = Stomp.Client(socket);

  //   let client = Stomp.overTCP("132.195.97.143/ide/", 8080);

  //   let client = new Stomp.Client({
  //     brokerURL: API_URL,
  //     connectHeaders: {
  //       ...authHeader(),
  //     },
  //   });
  //   let headers = {
  //     login: "mylogin",
  //     passcode: "mypasscode",
  //   };
  //   client.activate(headers, connectCallback);
  // },
  methods: {
    uploadImage(event) {
      let previewImg = document.getElementById("preview-image");
      let fileInputLabel = document.getElementById("file-input-label");

      if (event.target.files.length > 0) {
        if (event.target.files.length == 1) {
          fileInputLabel.innerHTML = event.target.files[0].name;
        } else {
          fileInputLabel.innerHTML =
            event.target.files.length + " Dateien ausgewählt";
        }

        console.log(event.target.files[0]);

        let src = URL.createObjectURL(event.target.files[0]);

        previewImg.src = src;

        console.log(previewImg);
      }

      const UPLOAD_URL = this.$hostname + "/api/image/upload";
      let data = new FormData();
      data.append("name", event.target.files[0].name);
      data.append("image", event.target.files[0]);
      data.append("isPublic", "true");
      data.append("tags", [1]);
      let config = {
        headers: {
          "Content-Type": "image/png",
          ...authHeader(),
          ...langHeader(),
        },
      };
      axios.post(UPLOAD_URL, data, config).then((response) => {
        console.log("image upload response > ", response);
      });
    },
  },
};
</script>

<style scoped>
#preview-div {
  height: 300px;
  width: 300px;
  border: 1px;
  border-style: solid;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
}

#preview-image {
  max-width: 100%;
  height: auto;
  display: inline-block;
}

#file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

#file-input + label {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  cursor: pointer;
}

#file-input:focus + label,
#file-input + label:hover {
  background-color: red;
}

#file-input:focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
</style>
