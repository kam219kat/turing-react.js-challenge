export default class DbService {
  static _usersCacheKey = 'usersContactList';

  /**
   * Return data from the localStorage cache.
   */
  static getCache = () => {
    return JSON.parse(localStorage.getItem(Services._usersCacheKey));
  };

  /**
   * Save data to the local storage cache.
   */
  static setCache = (value) => {
    localStorage.setItem(Services._usersCacheKey, JSON.stringify(value));
  };

  /**
   * Save the complete users list to caceh.
   */
  static getUsersList = () => {
    return Services.getCache(Services._usersCacheKey);
  };

  /**
   * Save the complete users list to caceh.
   */
  static saveUsersList = (usersList) => {
    Services.setCache(Services._usersCacheKey, usersList);
  };

  /**
   * Save the complete users list to caceh.
   */
  static updateUsersList = (user) => {
    let usersList = Services.getCache(Services._usersCacheKey);
    usersList = [...usersList, user];
    Services.setCache(Services._usersCacheKey, usersList);
    return usersList;
  };
}
