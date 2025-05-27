import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import searchRoute from "./routes/codes/search/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  codes: createTRPCRouter({
    search: searchRoute,
  }),
});

export type AppRouter = typeof appRouter;