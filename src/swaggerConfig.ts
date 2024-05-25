import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js/Express.js API for Notes Manager",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [
    "./src/features/auth/*.ts",
    "./src/features/notes/*.ts",
    "./src/features/users/*.ts",
    //"./src/DTO/*.ts",
  ],
};

const specs = swaggerJsdoc(options);
export default specs;
