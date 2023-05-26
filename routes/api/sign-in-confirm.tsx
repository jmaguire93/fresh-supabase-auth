import { Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "std/http/cookie.ts";
import { supabase } from "lib/supabase.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const { code } = await req.json();
    const cookies = getCookies(req.headers);
    const email = cookies.auth;
    const headers = new Headers();

    const { data: { user, session }, error } = await supabase.auth
      .verifyOtp({
        email,
        token: code,
        type: "email",
      });

    if (error) {
      return new Response(error.message, { status: error.status });
    }

    if (user === null) {
      return new Response("No user found", { status: 403 });
    }

    if (session == null) {
      return new Response("No session found", { status: 403 });
    }

    setCookie(headers, {
      name: "auth",
      value: session.access_token,
      maxAge: session.expires_in,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    headers.set("location", "/");

    return new Response(null, { status: 303, headers });
  },
};
