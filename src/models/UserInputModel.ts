export type UserInputModel = {
  /**
   * login (required field, string, maxLength: 15, minLength: 5)
   * password (required field, string, maxLength: 20, minLength: 6)
   * email (required field, string, only with pattern: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)
   */
  login: string;
  password: string;
  email: string;
};