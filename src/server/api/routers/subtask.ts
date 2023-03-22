import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const subtaskRouter = createTRPCRouter({
  getSubtasks: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.subtask.findMany({
        where: {
          taskId: input.taskId,
        },
      });
    }),
});
