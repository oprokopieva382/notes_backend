export const ResponseViewModel = {
  type: "object",
  required: ["status", "data"],
  properties: {
    status: { type: "number" },
    data: {
      type: "array",
      oneOf: [
        { $ref: "#/components/schemas/UserViewModel" },
        { $ref: "#/components/schemas/NoteViewModel" },
      ],
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

export const UserInputModel = {
  type: "object",
  required: ["login", "password", "email"],
  properties: {
    login: { type: "string", maxLength: 15, minLength: 5 },
    password: { type: "string", maxLength: 20, minLength: 6 },
    email: { type: "string", pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" },
  },
};
