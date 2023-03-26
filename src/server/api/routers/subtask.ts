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

  updateSubtask: protectedProcedure
    .input(z.object({ subtaskId: z.string(), subtaskStatus: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subtask.update({
        where: {
          id: input.subtaskId,
        },
        data: {
          isComplete: input.subtaskStatus,
        },
      });
    }),

  deleteSubtasksByTaskId: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subtask.deleteMany({
        where: {
          taskId: input.taskId,
        },
      });
    }),

  deleteSubtasksByProjectId: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subtask.deleteMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),
});
