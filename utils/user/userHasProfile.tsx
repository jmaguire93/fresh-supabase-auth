import { supabase } from "lib/supabase.ts";

async function userHasProfile(id: string) {
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id)
    .limit(1)
    .maybeSingle();

  return !!profile;
}

export default userHasProfile;
