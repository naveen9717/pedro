export const apiAccess = (
  env: 'dev' | 'prod' | 'dev-swagger',
): {version: string; apimKey: string} => {
  let version = '';
  let key = '';
  switch (env) {
    case 'dev':
      version = '1.0.0';
      key = '91446917bfed4d1b93360901cb5913c7';
      break;
    case 'dev-swagger':
      version = '1.0.0';
      key = '91446917bfed4d1b93360901cb5913c7';
      break;
    case 'prod':
      version = '';
      key = '';
      break;
    default:
      break;
  }

  return {version: version, apimKey: key};
};
