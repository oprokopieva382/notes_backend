export type NoteInputModel = {
  /**
   * Note title (required field, string & maxLength: 25)
   * Note isDone (boolean)
   */
  title: string;
  isDone?: boolean;
};
