export type NoteInputModel = {
  /**
   * Note title (required field, string & maxLength: 35, minLength: 5)
   * Note isDone (boolean)
   */
  title: string;
  isDone?: boolean;
};
