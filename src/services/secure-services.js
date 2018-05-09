let secureToken;

function getTokenPayload() {
  return JSON.parse(atob(secureToken.split('.')[1]));
}
function isTokenValid() {
  return secureToken != null && getTokenPayload().exp * 1000 /*in ms*/ + 10 /*margin*/ < Date.now() 
}
function getTokenLogin() {
  return secureToken != null ? getTokenPayload().login : null;
}

async function auth(login, password) {
  const data = new FormData();
  data.append("login", login)
  data.append("password", password );

  const response = await fetch("https://api-authenticate.aumjaud.fr/auth", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'application/json'
      },
      body: "login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password)
  });
  if(response.status == 200) {
    const json = await response.json();
    if(json.error) throw json.error;
    secureToken = json.token;
    return true;
  }
  else {
    return false;
  }
}

function secureFetch(url, options = {}) {
  if(!secureToken) throw "Not identified";

  if(!options.headers) options.headers = {};
  options.headers.Authorization = "Bearer " + secureToken;

  return fetch(url, options);
}   

export default {
  isTokenValid,
  getTokenLogin,
  auth,
  secureFetch
}
