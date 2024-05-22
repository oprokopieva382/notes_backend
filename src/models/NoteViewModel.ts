export type NoteViewModel = {
  /**
   * id (required field)
   * userId (required field)
   * title (required field)
   * isDone (if not provided default value = false)
   * createdAt (required field)
   */
  id: string;
  userId: string;
  title: string;
  isDone: boolean;
  createdAt: string;
};
