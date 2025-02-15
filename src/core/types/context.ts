import type { Di } from "../di/container";

declare module "hono" {
  interface ContextVariableMap {
    di: Di;
  }
}
