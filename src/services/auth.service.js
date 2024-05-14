import axios from "axios";
import langHeader from "./lang-header";
import * as jose from "jose";

//const API_URL = "http://localhost:8080/api/";
const API_URL = "http://xxxxxxxxxxxx:8080/api/";


class AuthService {
  login(user) {
    return axios
      .post(
        API_URL + "login",
        {
          email: user.username,
          password: user.password,
        },
        {
          headers: {
            ...langHeader(),
          },
        }
      )
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          let user = {};

          const accesstoken = jose.decodeJwt(response.data.message.accesstoken);
          // eslint-disable-next-line
          const refreshtoken = jose.decodeJwt(response.data.message.refreshtoken);

          user.email = accesstoken.name;
          user.id = accesstoken.sub;
          user.roles = accesstoken.roles;

          user.accesstoken = {};
          user.accesstoken.token = response.data.message.accesstoken;
          // * 1000 because of milliseconds vs seconds
          user.accesstoken.expires = accesstoken.exp * 1000;

          user.refreshtoken = {};
          user.refreshtoken.token = response.data.message.refreshtoken;
          // * 1000 because of milliseconds vs seconds
          user.refreshtoken.expires = refreshtoken.exp * 1000;

          console.log(user);

          localStorage.setItem("user", JSON.stringify(user));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return axios.post(
      API_URL + "register",
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      {
        headers: {
          ...langHeader(),
        },
      }
    );
  }
}

export default new AuthService();
