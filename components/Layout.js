import Link from 'next/link';
export default function Layout({ children }) {
  return (
    <div>
      <header style={{background:'#091124',padding:12}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{fontSize:20}}>🍔 <strong>Gainer RPG</strong></div>
            <div style={{color:'#9fb0c8'}}>Feed. Grow. Dominate.</div>
          </div>
          <nav>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/quests">Quests</Link>
            <Link href="/log">Log</Link>
            <Link href="/badges">Badges</Link>
            <Link href="/onboarding">Onboard</Link>
          </nav>
        </div>
      </header>
      <main className="container" style={{paddingTop:20}}>{children}</main>
    </div>
  );
}
