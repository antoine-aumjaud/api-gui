let secureToken;
let isRenewingToken = false;

function getTokenPayload() {
  return JSON.parse(atob(secureToken.split('.')[1]));
}
function getTokenLogin() {
  return secureToken != null ? getTokenPayload().login : null;
}
function isTokenValid() {
  return secureToken != null && getTokenPayload().exp * 1000 /*in ms*/ - 5*1000 /*margin 5s*/ > Date.now();
}
function isTokenShouldBeRenew() {
  return isTokenValid() && getTokenPayload().exp * 1000 /*in ms*/ - 60*1000 /*margin 60s*/ < Date.now();
}

async function auth(login, password) {
  console.info("Try to login with user '%s'", login);
  try {
    const json = await unsecureFetchJson('api-authenticate', 'userSign', {
        method: 'POST', 
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

function secureAccess() {
  //Redirect if token is not valid
  if(!isTokenValid()) window.location = "/#/sign-in";

  //Renew token if it could be renewed
  if(isTokenShouldBeRenew()) renewToken();
}

function securefetch(url, options) {
  //Check if user is logged
  secureAccess();

  addHeader(options, 'Authorization', 'Bearer ' + secureToken);
  return window.fetch(url, options);
}   

function isJson(body) {
  return typeof body === 'object';
}
function addHeader(options, name, value) {
  if(!options.headers) options.headers = {};
  options.headers[name] = value;
}
function fetchJson(fetchApi, appName, path, options) {
  addHeader(options, 'Accept', 'application/json');

  return fetchEmpty(fetchApi, appName, path, options)
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
  return fetchEmpty(fetchApi, appName, path, options)
    .then(response => {
      if(response.status >= 200 && response.status < 300) {
        return response.text();
      }
      else {
        throw response.status;
      }
    });
}

function fetchEmpty(fetchApi, appName, path, options) {
  if(options.body) {
    if(isJson(options.body)) {
      addHeader(options, 'Content-Type', 'application/json; charset=UTF-8');
      options.body = JSON.stringify(options.body);
    }
    else {
      addHeader(options, 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
  }
  
  return fetchApi("https://" + appName + '.aumjaud.fr/' + path, options);
}

function unsecureFetch(appName, path, options = {}) {
  return fetchEmpty(window.fetch, appName, path, options);
}
function secureFetch(appName, path, options = {}) {
  return fetchEmpty(securefetch, appName, path, options);
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

  //Check if user is authenticated, otherwhise redirect to signin page
  secureAccess,

  /*
  For All fetch method :
  - Content type and Accept are set automatically
  - for json, options.body should be an object
  */
  //Fetch and return a reponse promise
  secureFetch,
  unsecureFetch, 

  //Fetch and return a json content promise
  secureFetchJson,
  unsecureFetchJson,
  
  //Fetch and return a text content promise
  unsecureFetchText,
  secureFetchText
}
