import secureService from './secure-services.js'

async function sendMessage(message) {
  const content = await secureService.secureFetchJson('api-nabaztag', 'secure/sendMessage', {
    method: 'POST', 
    body: { message }
  });
  console.log(content)
  return false;
}   

export default {
  sendMessage
}
  