let secureToken;

function getTokenPayload() {
  return JSON.parse(atob(secureToken.split('.')[1]));
}
function isTokenValid() {
  return secureToken != null && getTokenPayload().exp * 1000 /*in s*/ - 5 /*margin 5s*/ > Date.now() 
}
function isTokenShouldBeRenew() {
  return secureToken != null && getTokenPayload().exp * 1000 /*in s*/ - 60 /*margin 60s*/ < Date.now() 
}
function getTokenLogin() {
  return secureToken != null ? getTokenPayload().login : null;
}

async function auth(login, password) {
  console.info("Try to login with user '%s'", login);
  try {
    const json = await unsecureFetchJson('api-authenticate', 'auth', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: "login=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password)
    });
    secureToken = json.token;
    return true;
  } 
  catch(e) {
    console.error(e);
    secureToken = null;
    return false;
  }
}
async function renewToken() {
  const login = getTokenLogin();
  console.info("Token will be expire, renew it with user '%s'", login);
  try {
    const json = await secureFetchJson('api-authenticate', 'secure/auth', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: "login=" + encodeURIComponent(login)
    });
    secureToken = json.token;
    return true;
  } 
  catch(e) {
    console.error(e);
    secureToken = null;
    return false;
  }
}

/*
GUI
- TEST RENEW
- ERREUR JS FAMILLE
- FAMILLE
  - GRAPH
  - FORM
- MENU SUR PORTABLE

- SERVICE FAMILLE ERREUR KG
- SERVICE CHATBOT INUPT UNKNOWN

*/


 function securefetch(url, options = {}) {
  //TODO redirect to signin vue
  if(!isTokenValid()) throw "Not identified";
  if(isTokenShouldBeRenew()) renewToken();

  if(!options.headers) options.headers = {};
  options.headers.Authorization = "Bearer " + secureToken;

  return window.fetch(url, options);
  //TODO manage no access return
}   

function fetchJson(fetchApi, appName, path, options) {
  if(!options.headers) options.headers = {};
  options.headers.Accept = 'application/json';

  return fetchApi("https://" + appName + '.aumjaud.fr/' + path, options)
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        throw response.status;
      }
    });
}

function fetchText(fetchApi, appName, path, options) {
  return fetchApi("https://" + appName + '.aumjaud.fr/' + path, options)
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
        return response.text();
      }
      else {
        throw response.status;
      }
    });
}


function unsecureFetchJson(appName, path, options = {}) {
  return fetchJson(window.fetch, appName, path, options);
}
function secureFetchJson(appName, path, options = {}) {
  return fetchJson(securefetch, appName, path, options);
}

function unsecureFetchText(appName, path, options = {}) {
  return fetchText(window.fetch, appName, path, options);
}
function secureFetchText(appName, path, options = {}) {
  return fetchText(securefetch, appName, path, options);
}


export default {
  isTokenValid,
  getTokenLogin,
  auth,
  
  secureFetchJson,
  unsecureFetchJson,
  
  unsecureFetchText,
  secureFetchText
}
