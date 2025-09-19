import { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { supabase } from '../lib/supabaseClient';

export default function CharacterCard(){
  const [profile, setProfile] = useState({weight:242, goal:300, xp:0, level:1, streak:0, badges:[]});

  useEffect(()=> {
    async function load() {
      try {
        const { data: session } = await supabase.auth.getSession();
        if(!session?.session) return;
        const uid = session.session.user.id;
        const { data: weights } = await supabase.from('weights').select('*').eq('user_id', uid).order('logged_at', {ascending:false}).limit(1);
        const latest = weights?.[0];
        if(latest) setProfile(p => ({...p, weight: latest.weight_lbs}));
        const { data: xp } = await supabase.from('xp_log').select('amount').eq('user_id', uid);
        const total = (xp || []).reduce((a,b)=>a+(b.amount||0),0);
        setProfile(p=>({...p, xp: total, level: Math.floor(total/500)+1}));
        const { data: badges } = await supabase.from('badges').select('badge_name').eq('user_id', uid).limit(10);
        setProfile(p=>({...p, badges: (badges||[]).map(b=>b.badge_name)}));
      } catch (e) { console.error(e) }
    }
    load();
  }, []);

  const download = () => {
    const element = document.getElementById('card');
    html2pdf().from(element).set({margin:0.5, filename:'character-card.pdf', html2canvas:{scale:2}}).save();
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div id="card" className="bg-white text-black p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">GAINER CHARACTER CARD</h1>
        <p><strong>Weight:</strong> {profile.weight} lbs</p>
        <p><strong>Goal:</strong> {profile.goal} lbs</p>
        <p><strong>XP:</strong> {profile.xp}</p>
        <p><strong>Level:</strong> {profile.level}</p>
        <p><strong>Streak:</strong> {profile.streak} days</p>
        <p><strong>Badges:</strong> {profile.badges.join(', ')}</p>
      </div>
      <button onClick={download} className="btn mt-4">Download PDF</button>
    </main>
  );
}
