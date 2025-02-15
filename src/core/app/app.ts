import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from "hono-openapi";
import { createRouter } from "../router/index.js";
import { createBaseApp } from "./base.app.js";

export const createApp = () => {
  const router = createRouter();

  const app = createBaseApp().route("/", router);

  app
    .get(
      "/openapi",
      openAPISpecs(app, {
        documentation: {
          info: {
            title: "Hono API",
            version: "1.0.0",
            description: "Greeting API",
          },
          servers: [
            { url: "http://localhost:3000", description: "Local Server" },
          ],
        },
      })
    )
    .get(
      "/swagger",
      apiReference({
        theme: "saturn",
        spec: { url: "/openapi" },
      })
    );

  return app;
};

export type AppType = ReturnType<typeof createApp>;
