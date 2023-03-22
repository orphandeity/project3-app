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
});
