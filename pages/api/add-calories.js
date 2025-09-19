import { supabase } from '../../lib/supabaseClient';
export default async function handler(req,res){
  const { calories } = req.body;
  const { data: session } = await supabase.auth.getSession();
  if(!session?.session) return res.status(401).json({ error:'not authenticated' });
  const uid = session.session.user.id;
  const date = new Date().toISOString().slice(0,10);
  const { error } = await supabase.from('daily_calories').upsert({ user_id: uid, date: date, calories_total: calories }, { onConflict: ['user_id','date']});
  if(error) return res.status(500).json({ error: error.message });
  return res.json({ ok:true });
}
