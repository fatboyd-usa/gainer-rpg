import { useState } from 'react';
export default function QuestLog(){
  const [loading, setLoading] = useState(false);
  const [narrative, setNarrative] = useState('');
  async function generate() {
    setLoading(true);
    const res = await fetch('/api/generate-weekly-log', { method:'POST' });
    const j = await res.json();
    setNarrative(j.narrative || 'No narrative returned.');
    setLoading(false);
  }
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weekly Quest Log</h1>
      <button onClick={generate} className="btn">{loading ? 'Generating...' : 'Generate Weekly Log'}</button>
      {narrative && <div className="mt-4 p-4 bg-white/5 rounded"><pre>{narrative}</pre></div>}
    </main>
  );
}
