import { app } from "./app";
import { ConnectMongoDB } from "./mongoDB";
import { SETTINGS } from "./settings";
import { logger } from "./utils/logger";

const runServer = async () => {
  const mongoDBConnected = await ConnectMongoDB();
  try {
    if (!mongoDBConnected) {
      logger.error("Failed to connect MongoDB Atlas");
      process.exit(1);
    }
    app.listen(SETTINGS.PORT, () => {
      logger.info(`Server runs on ${SETTINGS.PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to connect MongoDB: ${error}`);
    process.exit(1);
  }
};

runServer();
