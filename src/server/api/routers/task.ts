import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  getTasksByProjectId: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),

  getTaskByTaskId: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findFirst({
        where: {
          id: input.taskId,
        },
        include: {
          subtasks: true,
        },
      });
    }),

  createTask: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        task: z.object({
          title: z.string(),
          description: z.string(),
          status: z.string(),
        }),
        subtasks: z.array(z.object({ title: z.string() })),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({
        data: {
          userId: ctx.session.user.id,
          projectId: input.projectId,
          title: input.task.title,
          description: input.task.description,
          status: input.task.status,
          subtasks: {
            createMany: {
              data: input.subtasks.map((subtask) => ({
                userId: ctx.session.user.id,
                projectId: input.projectId,
                title: subtask.title,
              })),
            },
          },
        },
      });
    }),

  updateTaskStatus: protectedProcedure
    .input(z.object({ taskId: z.string(), taskStatus: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.taskId,
        },
        data: {
          status: input.taskStatus,
        },
      });
    }),

  deleteTaskByTaskId: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.taskId,
        },
        include: {
          subtasks: true,
        },
      });
    }),

  deleteTasksByProjectId: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.deleteMany({
        where: {
          projectId: input.projectId,
        },
      });
    }),
});
