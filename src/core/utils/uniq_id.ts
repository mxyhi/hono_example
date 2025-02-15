import cuid2 from "@paralleldrive/cuid2";
import { nanoid } from "nanoid";
import { hostname } from "node:os";

/**
 * nanoid
 * @param size @default 21
 * @returns
 */
export const uniqId = (size = 21) => {
  const id = nanoid(size);

  return id;
};

/**
 * cuid v2
 */
export const cuid = () => {
  return createId();
};

export const isCuid = (id: string) => {
  return cuid2.isCuid(id);
};

const createId = cuid2.init({
  length: 24,
  fingerprint: `aps_${hostname()}_${process.pid}_${process.ppid}`,
});
