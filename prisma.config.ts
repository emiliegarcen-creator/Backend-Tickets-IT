import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "mysql://miku:Popipo39_x@127.0.0.1:3306/tickey",
  },
});
