import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { subtaskRouter } from "./routers/subtask";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  project: projectRouter,
  task: taskRouter,
  subtask: subtaskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
