import express, { Request, Response } from "express";
import client from "prom-client";
import { logger } from "./logger";

export const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: "db_response_time_duration_seconds",
  help: "Database response time in seconds",
  labelNames: ["operation", "success"],
});

export const startMetricsServer = () => {
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics();

  app.get("/metrics", async (req: Request, res: Response) => {
    res.set("Content-Type", client.register.contentType);

    return res.send(await client.register.metrics());
  });

  const metricsServer = app.listen(9100, () => {
    logger.info("Metrics server started at http://localhost:9100");
  });

  return metricsServer;
};
