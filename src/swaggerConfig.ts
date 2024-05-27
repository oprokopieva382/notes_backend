import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js/Express.js API for Notes Manager",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Auth",
        description: "Auth endpoints",
      },
      {
        name: "Users",
        description: "Admin endpoints",
      },
      {
        name: "Notes",
        description: "Notes endpoints",
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT Bearer token only",
        },
      },
    },
  },
  apis: [
    "./settings.ts",
    "./src/features/auth/*.ts",
    "./src/features/notes/*.ts",
    "./src/features/users/*.ts",
    //"./src/DTO/*.ts",
  ],
};

const specs = swaggerJsdoc(options);
export default specs;
