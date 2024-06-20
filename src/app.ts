import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import specs from "./swaggerConfig";
import { SETTINGS } from "./settings";
import { usersRouter } from "./features/users";
import { notesRouter } from "./features/notes";
import { authRouter } from "./features/auth";
import { errorHandlerMiddleware } from "./middlewares";
import { logger } from "./utils/logger";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import responseTime from "response-time";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    if (req?.route?.path) {
      restResponseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    }
  })
);
app.use(SETTINGS.PATH.AUTH, authRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.NOTES, notesRouter);
app.use(errorHandlerMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.status(200).json({ version: SETTINGS.VERSION });
});

logger.info("Server started");
const metricsServer = startMetricsServer();

export {metricsServer}