import type { Di } from "../di/container";

export type BaseEnv = {
  Variables: {
    di: Di;
    tenantId: string;
  };
};
