import { timestamp } from "drizzle-orm/pg-core";

export const commonKeyEntity = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};
