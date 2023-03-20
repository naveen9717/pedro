const setEnv = (
  env: 'dev' | 'prod' | 'dev-swagger',
): {BASE: string; env: 'dev' | 'prod' | 'dev-swagger'; AUTH_BFF: string} => {
  let base = '';
  let base_bff = '';
  switch (env) {
    case 'dev':
      base = 'http://servicosonlineq.cpfl.com.br:7171';
      // base_bff = 'https://agv-bff-mob-usuarios.akscpfladr.dev';
      base_bff = 'https://gateway-apimdevaz.cpfl.com.br/bff/mob/usuarios';
      break;
    case 'dev-swagger':
      base = 'http://servicosonlineq.cpfl.com.br:7171';
      // base_bff = 'https://agv-bff-mob-usuarios.akscpfladr.dev';
      base_bff = 'https://agv-bff-mob-usuarios.akscpfladr.dev';
      break;
    case 'prod':
      base = 'https://servicosonline.cpfl.com.br';
      base_bff = 'https://agv-bff-mob-usuarios.akscpfladr.prd'; // Verificar
      break;
    default:
      break;
  }
  //agv-bff-mob-usuarios.akscpfladr.dev/
  return {BASE: base, env: env, AUTH_BFF: base_bff};
};

export const baseUrl: {
  BASE: string;
  env: 'dev' | 'prod' | 'dev-swagger';
  AUTH_BFF: string;
} = setEnv('dev');

export const baseUrls = {
  AUTH: `${baseUrl.BASE}/agencia-webapi/api`,
  CRYPTO: `${baseUrl.BASE}/agencia-webapi/api/chatboot`,
  AUTH_BFF: `${baseUrl.AUTH_BFF}`,
};
