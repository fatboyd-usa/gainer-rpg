import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useXp } from '../context/XpContext';
export default function Quests(){
  const { addXp } = useXp();
  const [quests,setQuests]=useState([]); const [popup,setPopup]=useState(null);
  const hypeLines = ["HELL YEAH! 🔥","You're unstoppable! 💪","MEGA CHOMP! 🍔","Gut's growing strong! 🐷","KING SIZE ENERGY 👑","Absolute unit mode activated 🚀"];
  useEffect(()=>{ checkQuests(); },[]);
  async function awardXp(userId,questName,xp){ await supabase.from('xp_log').insert([{user_id:userId,amount:xp,source:'quest:'+questName}]); addXp(xp); setPopup({questName,xp,hype:hypeLines[Math.floor(Math.random()*hypeLines.length)]}); setTimeout(()=>setPopup(null),3500); }
  async function checkQuests(){
    const { data: users } = await supabase.from('users').select('*').limit(1);
    if(!users||users.length===0) return;
    const user = users[0];
    const d7 = new Date(Date.now()-6*86400000).toISOString().split('T')[0];
    const { data: last7 } = await supabase.from('calorie_log').select('calories, logged_at').eq('user_id', user.id).gte('logged_at', d7);
    const map={}; if(last7){ for(const r of last7){ const d=r.logged_at.split('T')[0]; map[d]=(map[d]||0)+r.calories; } }
    const today = new Date().toISOString().split('T')[0]; const todayCals = map[today]||0;
    const days = Object.keys(map); const avg = days.length?Math.round(days.reduce((a,b)=>a+map[b],0)/days.length):0;
    const triggered=[];
    if(todayCals>0) triggered.push({name:'Log a Meal',xp:10});
    if(todayCals>=Math.max(4000,avg+500)) triggered.push({name:'Stuffed Stomach',xp:50});
    const dow = new Date().getDay();
    if((dow===0||dow===6)&& todayCals>=avg+2000) triggered.push({name:'Weekend Feast',xp:100});
    setQuests(triggered);
    for(const q of triggered) await awardXp(user.id,q.name,q.xp);
  }
  return (<div><h1>Quests</h1><div className="card"><h3>Today's Auto Quests</h3><ul>{quests.length===0 && <li className="small">No auto quests triggered yet.</li>}{quests.map((q,i)=><li key={i}>✅ {q.name} (+{q.xp} XP)</li>)}</ul></div>{popup && (<div className="popup-center"><div className="popup-back"></div><div className="popup-panel"><div style={{fontSize:42}}>{popup.hype}</div><h2 style={{marginTop:8}}>{popup.questName}</h2><div style={{color:'#10b981',marginTop:6}}>+{popup.xp} XP</div></div></div>)}</div>);
}
