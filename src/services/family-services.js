import secureService from './secure-services.js'

async function getLast() {
  return await secureService.secureFetchJson('api-family', 'secure/members?filter=last');
}   

async function saveSize(firstname, value, date) {
  const splittedValue = value.split('.');
  const m = splittedValue[0];
  const cm = splittedValue.length > 0 ? splittedValue[1] : '';
  const response = await secureService.secureFetch('api-family', 'secure/size', {
    method: 'POST', 
    body: {firstname, m, cm, date: date.getTime()}
  });
  return response.status == 200;
}
async function saveWeight(firstname, value, date) {
  const splittedValue = value.split('.');
  const kg = splittedValue[0];
  const g = splittedValue.length > 0 ? splittedValue[1] : '';
  const response = await secureService.secureFetch('api-family', 'secure/weight', {
    method: 'POST', 
    body: {firstname, kg, g, date: date.getTime()}
  });
  return response.status == 200;
}
async function saveShoesSize(firstname, value, date) {
  const response = await secureService.secureFetch('api-family', 'secure/shoes-size', {
    method: 'POST', 
    body: {firstname, number: value, date: date.getTime()}
  });
  return response.status == 200;
}

export default {
  getLast, 
  saveSize, saveWeight, saveShoesSize
}
    