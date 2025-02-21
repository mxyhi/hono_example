import { createMiddleware } from "hono/factory";
import { logger } from "hono/logger";
import { DateTime } from "luxon";

export const loggerMiddleware = createMiddleware(async (c, next) => {
  const reqId = c.get("requestId");
  const loggerHandler = logger((...args) => {
    console.log(`[${DateTime.local()}]`, reqId, ...args);
  });

  await loggerHandler(c, next);
});
