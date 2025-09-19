import { createContext, useContext, useState } from 'react';
const XpContext = createContext();
export function XpProvider({ children }) {
  const [xp, setXp] = useState(0);
  function addXp(amount) { setXp(prev => prev + (Number(amount)||0)); }
  function setXpValue(v){ setXp(Number(v)||0); }
  return <XpContext.Provider value={{ xp, addXp, setXpValue }}>{children}</XpContext.Provider>;
}
export function useXp(){ return useContext(XpContext); }
