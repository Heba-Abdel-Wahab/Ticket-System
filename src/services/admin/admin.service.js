import axios from "axios";
import authHeader from "../auth-header";
import langHeader from "../lang-header";

const API_URL = "http://localhost:8080/api/";

class AdminService {
  verifyUserManually(email) {
    return axios.post(
      API_URL + "verify/manually",
      {
        email: email,
      },
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  listUnverifiedUsers() {
    return axios.post(
      API_URL + "list/unverified",
      {},
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  listVerifiedUsers() {
    return axios.post(
      API_URL + "list/verified",
      {},
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  listRoles() {
    return axios.post(
      API_URL + "user/list/roles",
      {},
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  setRoleForUserManually(email, role) {
    return axios.post(
      API_URL + "user/set/role",
      {
        email: email,
        role: role,
      },
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
  getUserRoles(email) {
    return axios.post(
      API_URL + "user/get/roles",
      {
        email: email,
      },
      {
        headers: {
          ...authHeader(),
          ...langHeader(),
        },
      }
    );
  }
}

export default new AdminService();
