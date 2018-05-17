import secureService from './secure-services.js'

async function sendMessage(message) {
  const response = await secureService.secureFetch('api-nabaztag', 'secure/sendMessage', {
    method: 'POST', 
    body: { message }
  });
  return response.status == 200;
}   

export default {
  sendMessage
}
  