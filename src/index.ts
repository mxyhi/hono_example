import { nodeStarter } from "./core/starter/node";

export * from "./core/app/app";

const bootstrap = () => {
  nodeStarter(3000);
};

bootstrap();
