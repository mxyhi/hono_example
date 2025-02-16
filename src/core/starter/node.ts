import "dotenv/config";

import { serve } from "@hono/node-server";
import { createApp } from "../app/app.js";

export const nodeStarter = (port: number) => {
  const app = createApp();

  serve(
    {
      fetch: app.fetch,
      port: port,
    },
    (info) => {
      console.log(`Server running on http://localhost:${info.port}`);
    }
  );
};
