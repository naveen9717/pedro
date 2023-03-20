import {ApiUrls} from '../constants';
import {IUserFilters, IUsers} from '../interfaces';
import {Http} from '../lib';

class UserServices {
  async index(filters: IUserFilters): Promise<any | null> {
    return await Http.get(ApiUrls.users.getListUsers(filters));
  }
}
export const usersServices = new UserServices();
