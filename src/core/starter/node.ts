import "dotenv/config";

import { serve } from "@hono/node-server";
import { createApp } from "../app/app.js";
import { gracefulShutdown } from "../app/gracefulShutdown.js";

export const nodeStarter = (port: number) => {
  const app = createApp();

  const server = serve(
    {
      fetch: app.fetch,
      port: port,
    },
    (info) => {
      console.log(`Server running on http://localhost:${info.port}`);
    }
  );

  gracefulShutdown(server);
};
