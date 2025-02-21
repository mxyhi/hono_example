import { createBaseApp } from "../app/base.app.js";
import { requestContainerMiddleware } from "../middlewares/context.js";
import { createV1Router } from "./v1.js";
import { loggerMiddleware } from "../middlewares/logger.js";
import { requestId } from "hono/request-id";
import { uniqId } from "../utils/uniq_id.js";

export const createRouter = () => {
  const v1 = createV1Router();
  const router = createBaseApp()
    .basePath("/api")
    .use(
      requestId({
        generator: () => uniqId(),
      })
    )

    .use(requestContainerMiddleware)
    .use(loggerMiddleware)
    .route("/", v1);

  return router;
};
