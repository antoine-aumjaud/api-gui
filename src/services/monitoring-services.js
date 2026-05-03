import secureServices from './secure-services.js'

function getAppsConfig() {
  return [
    {"uid":"api-authenticate",     "name": "API Authenticate",     "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-docker",           "name": "API Docker",           "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-synology-chatbot", "name": "API Synology Chatbot", "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    {"uid":"api-family",           "name": "API Family",           "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}, {"name": "Reset Cache", "methodType": "text", "method": "secure/resetCache"}]},
    {"uid":"api-home-security",    "name": "API Home Security",    "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    /*    
    {"uid":"api-traefik",          "name": "API Traefik",            "status": "unknown", "type": "url"   , "url": "https://api-traefik.aumjaud.fr/dashboard/", "returnStatus": 401},
    {"uid":"antoine.aumjaud",      "name": "Site Antoine",           "status": "unknown", "type": "url"   , "url": "https://antoine.aumjaud.fr/cv/"},
    {"uid":"admin.aumjaud",        "name": "DS Admin",               "status": "unknown", "type": "url"   , "url": "https://admin.aumjaud.fr"},
    {"uid":"file.aumjaud",         "name": "DS File",                "status": "unknown", "type": "url"   , "url": "https://aumjaud.fr/file/"},
    {"uid":"aumjaud/photo",        "name": "DS Photos",              "status": "unknown", "type": "url"   , "url": "https://aumjaud.fr/photo/"},
    {"uid":"api-shopping-list",    "name": "API Shopping List",    "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}, {"name": "Reset Cache", "methodType": "text", "method": "secure/resetCache"}]},
    {"uid":"api-nabaztag",         "name": "API Nabaztag",         "status": "unknown", "actions": [{"name": "Reload Config", "methodType": "text", "method": "secure/reloadConfig"}]},
    */
  ];
}

async function checkAppStatus(app) {
  try {
    const json = await secureServices.unsecureFetchJson(app.uid, 'info');
    app.status = 'ok';
    app.infos = json;
  } catch(e) {
    app.status = 'error';
    app.error = e.message;
  }
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
  getAppsConfig,
  checkAppStatus,
  doAction
}
