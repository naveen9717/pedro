import {IUserFilters} from '../interfaces';

const urls = {
  auth: {
    login: () => '/login-app',
    loginFacebook: () => '/login-app',
    loginGoogle: () => '/login-app',
    myProfile: () => 'myprofile',
  },

  users: {
    getListUsers: (filters: IUserFilters) =>
      `/users?filters[role]=${filters.role}&filters[name]=${
        filters.name ?? ''
      }&filters[state]=${filters.state ?? ''}`,
  },
};
export default urls;
