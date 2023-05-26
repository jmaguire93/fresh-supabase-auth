import { supabase } from "lib/supabase.ts";

export async function userHasProfile(id: string) {
  const { data } = await getUserProfile(id);

  return !!data;
}

export function getUserProfile(id: string) {
  return supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .limit(1)
    .maybeSingle();
}
