import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";


export const linksRouter = createTRPCRouter({
    getLast: publicProcedure
    .input(z.object({ length: z.number().default(10) }))
    .query(({input, ctx}) => ctx.db.links.findMany({
        take: input.length,
        orderBy: {
            createdAt: 'desc'
        }
    })),
    getByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => 
        ctx.db.links.findMany({ where: { authorId: input.userId } })
    ),
    getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async({input, ctx}) => {
        const foundLink = await ctx.db.links.findFirst({
            where: {
                slug: input.slug
            }
        })

        if(!foundLink){
            throw new TRPCError({ code: 'NOT_FOUND', message: 'Link not found' })
        }

        return foundLink;
    }),
    create: protectedProcedure
    .input(z.object({
        slug: z.string(),
        redirectUrl: z.string().url(),
    }))
    .mutation(async({input, ctx}) => {
        await ctx.db.links.create({
            data: {
                slug: input.slug,
                redirectUrl: input.redirectUrl,
                authorId: ctx.session.user.id
            }
        })
    }),
    delete: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(({ input, ctx }) => ctx.db.links.delete({ where: { slug: input.slug } }))
})