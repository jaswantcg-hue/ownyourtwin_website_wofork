import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // The connection URL must come from an environment variable. Avoid hardcoding
    // sensitive credentials in source control. If DATABASE_URL is missing we let
    // Prisma report the error on startup.
    url: process.env.DATABASE_URL as string,
  },
});
