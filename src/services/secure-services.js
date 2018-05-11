let secureToken;
let isRenewingToken = false;

function getTokenPayload() {
  return JSON.parse(atob(secureToken.split('.')[1]));
}
function isTokenValid() {
  return secureToken != null && getTokenPayload().exp * 1000 /*in ms*/ - 5*1000 /*margin 5s*/ > Date.now();
}
function isTokenShouldBeRenew() {
  return secureToken != null && getTokenPayload().exp * 1000 /*in ms*/ - 60*1000 /*margin 60s*/ < Date.now();
}
function getTokenLogin() {
  return secureToken != null ? getTokenPayload().login : null;
}

async function auth(login, password) {
  console.info("Try to login with user '%s'", login);
  try {
    const json = await unsecureFetchJson('api-authenticate', 'userSign', {
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
  if(isRenewingToken) return;
  isRenewingToken = true;
  const login = getTokenLogin();
  console.info("Token will be expire, renew it with user '%s'", login);
  try {
    const json = await secureFetchJson('api-authenticate', 'secure/renewUserSign', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: "login=" + encodeURIComponent(login)
    });
    secureToken = json.token;
  } 
  catch(e) {
    console.error(e);
  }
  finally {
    isRenewingToken = false;
  }
}

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
