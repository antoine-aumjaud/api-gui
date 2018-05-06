/*
npm install cors-anywhere
cd nodes_modules/cors-anywhere
export PORT=9080
node server.js
Running CORS Anywhere on 0.0.0.0:9080
 */
const LOCAL_CORS = "http://localhost:9080/";
//const PROD = "https://";
const PROTOCOL = LOCAL_CORS;

function getApps () {
  const apps = [
    {"uid":"api-traefik",          "name": "API Traefik",            "type": "url"   , "url": "api-traefik.aumjaud.fr/dashboard/", "returnStatus": 401},
    {"uid":"api-authenticate",     "name": "API Authenticate",       "type": "docker"},
    {"uid":"api-docker",           "name": "API Docker",             "type": "docker"},
    {"uid":"api-synology-chatbot", "name": "API Synology Chatbot",   "type": "docker"},
    {"uid":"api-family",           "name": "API Famille",            "type": "docker"},
    {"uid":"api-home-security",    "name": "API Home Security",      "type": "docker"},
    {"uid":"api-nabaztag",         "name": "API Nabaztag",           "type": "docker"},
    {"uid":"api-file",             "name": "API File",               "type": "docker"},
    {"uid":"api-shopping-list",    "name": "API Shopping List",      "type": "docker"},
    {"uid":"antoine.aumjaud",      "name": "Site Antoine",           "type": "url"   , "url": "antoine.aumjaud.fr/cv/"},
    {"uid":"admin.aumjaud",        "name": "DS Admin",               "type": "url"   , "url": "admin.aumjaud.fr"},
    {"uid":"file.aumjaud",         "name": "DS File",                "type": "url"   , "url": "aumjaud.fr/file/"},
    {"uid":"aumjaud/photo",        "name": "DS Photos",              "type": "url"   , "url": "aumjaud.fr/photo/"},
    {"uid":"surveillance.aumjaud", "name": "DS Surveillance",        "type": "url"   , "url": "surveillance.aumjaud.fr"},
    {"uid":"security-api.aumjaud", "name": "API Home Security HTTP", "type": "url"   , "url": "security-api.aumjaud.fr:81", "returnStatus": 401},
  ];
  
  apps.forEach(app => {
    app.status = "unknown";

    switch(app.type) {
      case "docker": 
        callMethod(app, PROTOCOL + app.uid + '.aumjaud.fr/hi');
        break;
      case "url": 
        callMethod(app, PROTOCOL + app.url);
        break;
      default: 
        throw "Unknown app type: " + app.type;
    }

  })

  /*
  return window
    .fetch('https://bhvb4ch330.execute-api.eu-west-1.amazonaws.com/dev/recipes')
    .then(response   => response.json())
    .then(serverApps => apps.concat(serverApps))
  */
  return apps;
}   

function callMethod(app, url) {
  window
    .fetch(url)
    .then(response => {
      if(response.status == (app.returnStatus || 200)) {
        app.status = "ok"
      }
      else {
        app.status = "error";
        app.error = response.status + ": " + response.statusText;
      }
    })
    .catch(e => {
      app.status = "error"; 
      app.error = e
    });
}

export default {
  getApps
}
