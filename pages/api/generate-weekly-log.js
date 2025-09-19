import { supabase } from '../../lib/supabaseClient';
export default async function handler(req,res){
  const { data: session } = await supabase.auth.getSession();
  if(!session?.session) return res.status(401).json({ error:'not authenticated' });
  const uid = session.session.user.id;
  const sevenAgo = new Date(Date.now() - 7*24*60*60*1000).toISOString().slice(0,10);
  const { data: cals } = await supabase.from('daily_calories').select('calories_total,date').eq('user_id', uid).gte('date', sevenAgo);
  const arr = (cals||[]).map(r => r.calories_total || 0);
  const avg = arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;
  const { data: weights } = await supabase.from('weights').select('weight_lbs, logged_at').eq('user_id', uid).order('logged_at', {ascending:false}).limit(2);
  const latest = weights?.[0]?.weight_lbs || null;
  const prev = weights?.[1]?.weight_lbs || null;
  const weightChange = (latest !== null && prev !== null) ? (parseFloat(latest) - parseFloat(prev)) : 0;
  const { data: xpRows } = await supabase.from('xp_log').select('amount').eq('user_id', uid).gte('created_at', new Date(Date.now()-7*24*60*60*1000).toISOString());
  const xpThisWeek = (xpRows||[]).reduce((a,b)=>a+(b.amount||0),0);
  const { data: badges } = await supabase.from('badges').select('badge_name, earned_at').eq('user_id', uid).gte('earned_at', new Date(Date.now()-7*24*60*60*1000).toISOString());
  const badgesList = (badges||[]).map(b=>b.badge_name);
  const { data: settings } = await supabase.from('settings').select('value').eq('user_id', uid).eq('key','currentStreak').single();
  const streak = settings?.value ? parseInt(settings.value) : 0;
  const combo = Math.min(100, Math.round((streak/30)*100));
  const weightText = weightChange>0 ? `packed on +${weightChange.toFixed(1)} lbs` : weightChange<0 ? `lost ${Math.abs(weightChange).toFixed(1)} lbs` : 'no change';
  const achievementsText = badgesList.length ? `Unlocked: ${badgesList.join(', ')}. ` : '';
  const narrative = [
    `Week update: The Gainer marched in hungry and heavy.`,
    `Averaged ${avg} cals/day and ${weightText} this week.`,
    `Combo meter at ${combo}% (${streak}-day streak).`,
    `XP this week: +${xpThisWeek}. ${achievementsText}Another chapter closer to 300 lbs.`
  ].join(' ');
  await supabase.from('weekly_logs').insert([{ user_id: uid, narrative }]);
  return res.json({ narrative });
}
