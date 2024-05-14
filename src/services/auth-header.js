export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accesstoken) {
    //5000 => Less than 5 seconds till token expires
    if (user.accesstoken.expires - new Date() <= 5000) {
      // ToDo: Auth-Refresh
    }
    return { Authorization: "Bearer " + user.accesstoken.token };
  } else {
    return {};
  }
}
