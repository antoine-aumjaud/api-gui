import secureServices from './secure-services.js'

async function getNearestStation() {
  if (navigator.geolocation) {
    const position = await getPosition();
    const response = await window.fetch("https://ressources.data.sncf.com/api/records/1.0/search/?dataset=sncf-gares-et-arrets-transilien-ile-de-france&lang=fr&rows=1&facet=code_uic&facet=nom_gare&"
      + "geofilter.distance=" + position.coords.latitude + "," + position.coords.longitude + ", 2000");
    const json = await response.json();
    if(response.status == 200 & json.nhits === 1) {
      const fields = json.records[0].fields;
      return {uic: fields.code_uic, town: fields.commune};
    }
    else throw "SNCF DATA API returns " + response.status + ": " + response.json();
  } 
  else throw "Geolocation is not supported by this browser.";
} 

async function getNextTrains(uic) {
  const sncfToken = await getSncfAPIToken();
  const dateStr = formatDate(new Date());
  //const date = "20180915T232935";
  const response = await window.fetch("https://api.sncf.com/v1/coverage/sncf/stop_areas"
    + "/stop_area:OCE:SA:" + uic
    + "/departures?datetime=" + dateStr,  
    { method: 'GET',
      headers: new Headers([
        ['Authorization', 'Basic ' + btoa(sncfToken)]
    ]) 
  });

  switch (response.status) { 
    case 401: throw "Authentication failed or missing (invalid API key?)"; 
    case 403: 
      if (response.headers['Retry-After']) throw "API call quota exceeded (retry after $retry_after s)";
      else throw "Forbidden (invalid station or other error)";
    case 404: throw "Invalid path supplied to API call";
    case 406: throw "Unsupported version";
    case 500: throw "API is broken";
    case 503: throw "API is overloaded";
    default: break;
  }

  const json = await response.json();
  const disruptions = json.disruptions;
  const directions = new Set();
  const nextDepatures = [];
  json.departures.forEach(departure => {
    directions.add(departure.display_informations.direction);
    nextDepatures.push({
      code: departure.display_informations.code, 
      direction: departure.display_informations.direction,
      date: parseDate(departure.stop_date_time.departure_date_time)
    });
  });
  return {disruptions, directions: Array.from(directions), nextDepatures};
}

//  20180916T215100  
function formatDate(dateToFormat) {
  return dateToFormat.getFullYear() 
    + pad( dateToFormat.getMonth() + 1 ) 
    + pad( dateToFormat.getDate() ) 
    + 'T' 
    + pad( dateToFormat.getHours() ) 
    + pad( dateToFormat.getMinutes() ) 
    + pad( dateToFormat.getSeconds() );
}
function parseDate(dateStr) {
  const year  = dateStr.substr(0,4);
  const month = dateStr.substr(4,2);
  const day   = dateStr.substr(6,2);
  const hour  = dateStr.substr(9,2);
  const min   = dateStr.substr(11,2);
  const sec   = dateStr.substr(12,2);
  return new Date(year, month-1, day, hour, min, sec).getTime();
}

function pad(number) {
  if ( number < 10 ) {
    return '0' + number;
  }
  return number;
}

function getPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function getSncfAPIToken() {
  return await secureServices.secureFetchText('api-secrets', 'secure/properties/sncf.token', { method: 'GET' });
}

export default {
  getNearestStation,
  getNextTrains
}
  