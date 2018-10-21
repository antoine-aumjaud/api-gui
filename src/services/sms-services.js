import secureServices from './secure-services.js'

async function sendMessage(name, message) {
  const loggedUser = secureServices.getTokenLogin();
  const response = await secureServices.secureFetch('api-home-security', 
    "/secure/message/sms?user=" + name + "&message=" + encodeURI(message) + '. ' + loggedUser);
  return response.status == 200;
}   

export default {
  sendMessage
}
  