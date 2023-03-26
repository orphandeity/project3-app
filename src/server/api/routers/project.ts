import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAllProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        tasks: true,
      },
    });
  }),

  getProjectById: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findFirst({
        where: {
          id: input.projectId,
        },
      });
    }),

  getProjectByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  createProject: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
        },
      });
    }),

  deleteProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.delete({
        where: {
          id: input.projectId,
        },
      });
    }),
});
