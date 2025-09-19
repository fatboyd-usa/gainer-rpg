import { supabase } from '../../lib/supabaseClient';
export default async function handler(req,res){
  const { data: session } = await supabase.auth.getSession();
  if(!session?.session) return res.json({ user: null });
  return res.json({ user: session.session.user });
}
