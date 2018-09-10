import secureServices from './secure-services.js'

async function isActivated() {
  const content = await secureServices.secureFetchText('api-home-security', 'secure/isActivated');
  return content === "true";
}   
async function activate() {
  const content = await secureServices.secureFetchText('api-home-security', 'secure/activate?isImediate=true');
  return content === "activated";
}   
async function deactivate(user) {
  const content = await secureServices.secureFetchText('api-home-security', 'secure/desactivate?id=' + user);
  return content === "deactivated";
}   

export default {
  isActivated, 
  activate, 
  deactivate
}
  