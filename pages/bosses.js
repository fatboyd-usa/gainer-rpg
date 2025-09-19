import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Bosses(){
  const [bosses, setBosses] = useState([]);
  useEffect(()=> {
    async function load() {
      try {
        const { data: b } = await supabase.from('boss_progress').select('*').limit(10);
        setBosses(b || []);
      } catch(e) { console.error(e) }
    }
    load();
  }, []);
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Boss Tracker</h1>
      <div className="space-y-3">
        {bosses.length===0 && <div className="p-4 bg-white/5 rounded">No active bosses yet.</div>}
        {bosses.map(b => (
          <div key={b.id} className="p-4 bg-white/5 rounded">
            <strong>{b.boss_name}</strong>
            <div className="mt-2">HP: {b.hp} / 100</div>
          </div>
        ))}
      </div>
    </main>
  );
}
