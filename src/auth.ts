import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { customSession } from "better-auth/plugins";
import { UserRole } from "../generated/prisma/enums";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          ...profile,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: UserRole.USER,
        };
      },
    },
    github: {
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          ...profile,
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: UserRole.USER,
        };
      },
    },
},
  secret: process.env.BETTER_AUTH_SECRET as string,
  plugins: [
    customSession(async ({ user, session }) => {
      // Update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      }).catch(() => {
        // Silently fail to not block authentication
      });

      const userRole = await prisma.user.findFirst({
        select: { role: true },
        where: { id: user.id },
      });
      return {
        ...session,
        role: userRole?.role ?? UserRole.USER,
      };
    }),
    nextCookies(),
  ],

});
