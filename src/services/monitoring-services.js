function getApps () {
  const apps = [
    {"uid":"api-authenticate",     "name": "API Authenticate",       "type": "docker"},
    {"uid":"api-docker",           "name": "API Docker",             "type": "docker"},
    {"uid":"api-synology-chatbot", "name": "API Synology Chatbot",   "type": "docker"},
    {"uid":"api-family",           "name": "API Family",             "type": "docker"},
    {"uid":"api-home-security",    "name": "API Home Security",      "type": "docker"},
    {"uid":"api-nabaztag",         "name": "API Nabaztag",           "type": "docker"},
    {"uid":"api-file",             "name": "API File",               "type": "docker"},
    {"uid":"api-shopping-list",    "name": "API Shopping List",      "type": "docker"},
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

    switch(app.type) {
      case "docker": 
        callMethod(app, "https://" + app.uid + '.aumjaud.fr/hi');
        break;
      case "url": 
        callMethod(app, app.url);
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
