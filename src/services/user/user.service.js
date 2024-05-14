import axios from "axios";
import authHeader from "../auth-header";
import langHeader from "../lang-header";

//const API_URL = "http://localhost:8080/api/user/";
const API_URL = "http://xxxxxxxxxxx:8080/api/user/";

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + 'all');
  // }

  changePassword(oldPassword, newPassword) {
    return axios.post(
      API_URL + "change/password",
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        newPasswordRepetition: newPassword,
      },
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  getUserProfile() {
    return axios.post(
      API_URL + "get/profile",
      {},
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }
  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

export default new UserService();
