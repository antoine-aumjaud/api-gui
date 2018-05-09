import secureService from './secure-services.js'

async function isActivated() {
  const response = await secureService.secureFetch('https://api-home-security.aumjaud.fr/secure/isActivated');
  const content = await response.text()
  if(response.status != 200) throw response.status + ": " + content;
  return content === "true";
}   
async function activate() {
  const response = await secureService.secureFetch('https://api-home-security.aumjaud.fr/secure/activate?isImediate=true');
  const content = await response.text()
  if(response.status != 200) throw response.status + ": " + content;
  return content === "activated";
}   
async function deactivate(user) {
  const response = await secureService.secureFetch('https://api-home-security.aumjaud.fr/secure/desactivate?id=' + user);
  const content = await response.text()
  if(response.status != 200) throw response.status + ": " + content;
  return content === "deactivated";
}   

export default {
  isActivated, 
  activate, 
  deactivate
}
  