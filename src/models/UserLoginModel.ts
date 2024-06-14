export type UserLoginModel = {
  /**
   * login (required field, string, maxLength: 15, minLength: 5)
   * password (required field, string, maxLength: 20, minLength: 6)
   */
  login: string;
  password: string;
};
