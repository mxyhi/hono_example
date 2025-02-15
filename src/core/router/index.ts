import { createBaseApp } from "../app/base.app.js";
import { requestContainerMiddleware } from "../middlewares/context.js";
import { createV1Router } from "./v1.js";

export const createRouter = () => {
  const v1 = createV1Router();
  const router = createBaseApp()
    .basePath("/api")
    .use(requestContainerMiddleware)
    .route("/", v1);

  return router;
};
