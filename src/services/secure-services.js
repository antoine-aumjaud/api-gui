const LOCAL_CORS = "http://localhost:9080/";
//const PROD = "https://";
const PROTOCOL = LOCAL_CORS;

let secureToken;

function isTokenValid() {
  return secureToken && btoa(secureToken.split('\\.')[1]).exp * 1000 /*in ms*/ + 10 /*margin*/ < Date.now() 
}

function auth(login, password) {
  return fetch(PROTOCOL + "api-authenticate.aumjaud.fr/auth", 
    {
      method: 'POST', 
      headers: {'Accept': 'application/json'}, 
      body: "login=" + login + "&password=" + password
    }).then(response => {
      if(response.status == 200) secureToken = response.json().token;
      else throw response.status;
    });
}

function secureFetch(url, options) {
  if(!options) options = {};
  if(!options.headers) options.headers = {};
  options.headers.Authorization = "Bearer " + secureToken;

  return fetch(url, options);
}   

export default {
  isTokenValid,
  auth,
  secureFetch
}
