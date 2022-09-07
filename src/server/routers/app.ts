import * as trpc from "@trpc/server";
import { guests } from "server/routers/guests";

export const appRouter = trpc.router().merge("guests.", guests);
