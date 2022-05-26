import secureServices from './secure-services.js'

function getApps() {
  const apps = [
    {"uid":"api-authenticate",     "name": "API Authenticate",     "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-docker",           "name": "API Docker",           "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-synology-chatbot", "name": "API Synology Chatbot", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-family",           "name": "API Family",           "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}, {"name": "Reset Cache", "methodType": "text", "method": "secure/resetCache"}]},
    {"uid":"api-home-security",    "name": "API Home Security",    "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-nabaztag",         "name": "API Nabaztag",         "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-shopping-list",    "name": "API Shopping List",    "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}, {"name": "Reset Cache", "methodType": "text", "method": "secure/resetCache"}]},
    //{"uid":"api-error",            "name": "API Error",            "actions": []},
    /*    
    {"uid":"api-traefik",          "name": "API Traefik",            "type": "url"   , "url": "https://api-traefik.aumjaud.fr/dashboard/", "returnStatus": 401},
    {"uid":"antoine.aumjaud",      "name": "Site Antoine",           "type": "url"   , "url": "https://antoine.aumjaud.fr/cv/"},
    {"uid":"admin.aumjaud",        "name": "DS Admin",               "type": "url"   , "url": "https://admin.aumjaud.fr"},
    {"uid":"file.aumjaud",         "name": "DS File",                "type": "url"   , "url": "https://aumjaud.fr/file/"},
    {"uid":"aumjaud/photo",        "name": "DS Photos",              "type": "url"   , "url": "https://aumjaud.fr/photo/"},
    {"uid":"surveillance.aumjaud", "name": "DS Surveillance",        "type": "url"   , "url": "https://surveillance.aumjaud.fr"},
    {"uid":"security-api.aumjaud", "name": "API Home Security HTTP", "type": "url"   , "url": "http://security-api.aumjaud.fr:81", "returnStatus": 401},
    */
  ];

  apps.forEach(app => {
    app.status = "unknown";
    secureServices.unsecureFetchJson(app.uid, 'info')
      .then(json => {
        app.status = "ok"
        app.infos = json; 
      })
      .catch(e => {
        app.status = "error";
        app.error = e.message;
      })
  });
  return apps;
}

async function doAction(app, action) {
  let content;
  switch(action.methodType) {
    case "text":
      content = await secureServices.secureFetchText(app.uid, action.method);
      break;
    case "json":
      content = await secureServices.secureFetchJson(app.uid, action.method);
      break;
  }
  return content; 
}

export default {
  getApps,
  doAction
}
