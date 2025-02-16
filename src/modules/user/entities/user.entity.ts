import { commonKeyEntity } from "@/core/entities";
import { cuid } from "@/core/utils/uniq_id";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const userEntity = pgTable("user", {
  ...commonKeyEntity,

  id: varchar("id", { length: 128 })
    .primaryKey()
    .$defaultFn(() => cuid()),
});
