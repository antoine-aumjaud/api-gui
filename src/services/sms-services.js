import secureServices from './secure-services.js'

async function sendMessage(name, message) {
  const id    = await secureServices.secureFetchText('api-secrets', 'secure/properties/sms.' + name + '.id',    { method: 'GET' });
  const token = await secureServices.secureFetchText('api-secrets', 'secure/properties/sms.' + name + '.token', { method: 'GET' });
  const loggedUser = secureServices.getTokenLogin();
  //to avoid CORS errors, open API in new Tab
  window.open('https://smsapi.free-mobile.fr/sendmsg'
    + '?user=' + id 
    + '&pass=' + token 
    + '&msg='  + encodeURI(message) + '. ' + loggedUser, '_blank');
  return true;
}   

export default {
  sendMessage
}
  