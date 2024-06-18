import { NextFunction, Request, Response } from "express";
import { Counter } from "prom-client";
import { formatISO, differenceInSeconds } from "date-fns";
import { logger } from "../utils/logger";

const requestCounter = new Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "status_code", "route"],
});

let lastRequestCount = 0;
let lastTimestamp = formatISO(new Date());

export const captureMetricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const { method, originalUrl } = req;
  requestCounter.labels(method, "0", originalUrl).inc();

  next();

  res.on("finish", async () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode.toString();
    requestCounter.labels(method, statusCode, originalUrl).inc();

    const metrics = await requestCounter.get();

    const metricEntry = metrics.values.find(
      (entry) =>
        entry.labels.method === method &&
        entry.labels.status_code === statusCode &&
        entry.labels.route === originalUrl
    );

    const counterValue = metricEntry ? metricEntry.value : 0;

    const currentTimestamp = formatISO(new Date());

    const elapsedTime = differenceInSeconds(
      new Date(currentTimestamp),
      new Date(lastTimestamp)
    );

    const requestRate =
      elapsedTime > 0 ? (counterValue - lastRequestCount) / elapsedTime : 0;

    lastRequestCount = counterValue;
    lastTimestamp = currentTimestamp;

    logger.info(
      `Request: ${method} ${originalUrl} - ${statusCode} ${duration}ms, Elapsed Time: ${elapsedTime.toFixed(
        2
      )}s, Counter: ${counterValue}, Request Rate: ${requestRate.toFixed(
        2
      )} req/s`
    );
  });
};
