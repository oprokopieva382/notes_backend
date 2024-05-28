export const ResponseViewNoteModel = {
  type: "object",
  required: ["status", "data"],
  properties: {
    status: { type: "number" },
    data: {
      type: "array",
      $ref: "#/components/schemas/NoteViewModel",
    },
    message: { type: "string" },
    errors: { type: "array", items: { type: "string" } },
  },
};

export const ResponseSuccessUserLoginModel = {
  type: "object",
  required: ["status", "data"],
  properties: {
    status: { type: "number" },
    data: {
      type: "array",
      $ref: "#/components/schemas/LoginSuccessViewModel",
    },
    message: { type: "string" },
    errors: { type: "array", items: { type: "string" } },
  },
};

export const ResponseViewUserModel = {
  type: "object",
  required: ["status", "data"],
  properties: {
    status: { type: "number" },
    data: {
      type: "array",
      $ref: "#/components/schemas/UserViewModel",
    },
    message: { type: "string" },
    errors: { type: "array", items: { type: "string" } },
  },
};

export const UserViewModel = {
  type: "object",
  required: ["id", "login", "email", "createdAt"],
  properties: {
    id: { type: "string" },
    login: { type: "string" },
    email: { type: "string" },
    createdAt: { type: "string" },
  },
};

export const LoginSuccessViewModel = {
  type: "object",
  required: ["accessToken"],
  properties: {
    accessToken: { type: "string" },
  },
};

export const UserSignUpModel = {
  type: "object",
  required: ["login", "password", "email"],
  properties: {
    login: { type: "string", maxLength: 15, minLength: 5 },
    password: { type: "string", maxLength: 20, minLength: 6 },
    email: { type: "string", pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" },
  },
  example: {
    login: "kevin1985",
    password: "bdfbdfbd",
    email: "kevin@example.com",
  },
};

export const UserLogInModel = {
  type: "object",
  required: ["login", "password"],
  properties: {
    login: { type: "string", maxLength: 15, minLength: 5 },
    password: { type: "string", maxLength: 20, minLength: 6 },
  },
  example: {
    login: "kevin1985",
    password: "password123",
  },
};

export const NoteViewModel = {
  type: "object",
  required: ["id", "userId", "title", "isDone", "createdAt"],
  properties: {
    id: { type: "string" },
    userId: { type: "string" },
    title: { type: "string" },
    isDone: { type: "boolean" },
    createdAt: { type: "string" },
  },
};

export const NoteInputModel = {
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", maxLength: 35, minLength: 5 },
    isDone: { type: "boolean" },
  },
  example: {
    title: "Learn REST API's",
  },
};
