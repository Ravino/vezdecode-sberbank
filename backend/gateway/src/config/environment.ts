const listEnvVar: Array<string> = [
  'CONF_SET_COOKIE_NAME'
];


export function environmentInitialization() {

  let status: string = 'success';
  for(let i of listEnvVar) {
    if(!global.process.env[i]) {
      console.log(`Empty env var ${ i }`);
      status = 'notSuccess';
    }
  }


  if(status == 'notSuccess') {
    global.process.exit();
  }
}
