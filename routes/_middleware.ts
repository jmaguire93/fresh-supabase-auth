import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { User } from "supabase";

import { redis } from "lib/redis.ts";

interface Session {
  user: User | null;
}

export type ServerState = {
  user: User | null;
  error: { code: number; msg: string } | null;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;

  const profile = url.pathname == "/profile";
  const createProfile = url.pathname == "/create-profile";

  const headers = new Headers();
  headers.set("location", "/");

  if ((profile || createProfile) && !access_token) {
    // Can't use 403 if we want to redirect to home page.
    return new Response("not authenticated for protected route!", {
      headers,
      status: 303,
    });
  }

  if (access_token) {
    const session = await redis.get(access_token) as Session;

    if ((profile || createProfile) && !session) {
      return new Response(null, { headers, status: 303 });
    }

    const user = session?.user;
    ctx.state.user = user;
  }

  return await ctx.next();
}
