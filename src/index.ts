import { app } from "./app";
import { ConnectMongoDB } from "./mongoDB";
import { SETTINGS } from "./settings";

const runServer = async () => {
  const mongoDBConnected = await ConnectMongoDB();
  try {
    if (!mongoDBConnected) {
      console.log("Failed to connect MongoDB Atlas");
      process.exit(1);
    }
    app.listen(SETTINGS.PORT, () => {
      console.log(`Server runs on ${SETTINGS.PORT}`);
    });
  } catch (error) {
    console.error("Failed to run server:", error);
    process.exit(1);
  }
};

runServer();
