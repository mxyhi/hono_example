import { helloController } from "@/modules/hello/hello.controller.js";
import { createBaseApp } from "../app/base.app.js";

export const createV1Router = () => {
  const v1 = createBaseApp().basePath("/v1").route("/", helloController);

  return v1;
};
