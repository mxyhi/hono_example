import type { ServerType } from "@hono/node-server";
import { Server } from "node:http";

export const gracefulShutdown = (server: ServerType) => {
  const onShutdown = (e: NodeJS.Signals) => {
    console.log("event:", e);
    if (server instanceof Server) {
      server.headersTimeout = 6 * 1000;
      server.keepAliveTimeout = 5 * 1000;
    }

    server.close((err) => {
      if (err) {
        console.log(err);
      }
      console.log("Server closed");
    });
  };

  process.on("SIGINT", onShutdown);
  process.on("SIGTERM", onShutdown);
};
