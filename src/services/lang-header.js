export default function langHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.language) {
    return { "Accept-Language": user.language };
  } else {
    let browserLanguage = navigator.language || navigator.userLanguage;
    return { "Accept-Language": browserLanguage };
  }
}
