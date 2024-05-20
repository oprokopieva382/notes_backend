import { app } from "./app";
import { SETTINGS } from "./settings";

const runServer = async () => {
  try {
    app.listen(SETTINGS.PORT, () => {
      console.log(`Server runs on ${SETTINGS.PORT}`);
    });
  } catch (error) {
    console.error("Failed to run server:", error);
  }
};

runServer()