import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type EntryType = 'receive' | 'give' | 'expense';
export type Person = { id: string; name: string; phone?: string };
export type Entry = { id: string; personId?: string; personName?: string; type: EntryType; amount: number; note: string; date: string };

type KhataValue = {
  people: Person[]; entries: Entry[];
  addPerson: (name: string, phone?: string) => void;
  addEntry: (entry: Omit<Entry, 'id' | 'date'>) => void;
  deleteEntry: (id: string) => void;
  balanceFor: (personId: string) => number;
  totalReceivable: number; totalPayable: number; totalExpenses: number; netProfit: number;
};
const KhataContext = createContext<KhataValue | null>(null);
const key = 'hisab-khata-v1';
const id = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function KhataProvider({ children }: { children: React.ReactNode }) {
  const [people, setPeople] = useState<Person[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => { AsyncStorage.getItem(key).then(raw => { if (raw) { const parsed = JSON.parse(raw); setPeople(parsed.people ?? []); setEntries(parsed.entries ?? []); } }); }, []);
  useEffect(() => { AsyncStorage.setItem(key, JSON.stringify({ people, entries })); }, [people, entries]);
  const addPerson = (name: string, phone?: string) => setPeople(prev => [...prev, { id: id(), name: name.trim(), phone: phone?.trim() }]);
  const addEntry = (entry: Omit<Entry, 'id' | 'date'>) => setEntries(prev => [{ ...entry, id: id(), date: new Date().toISOString() }, ...prev]);
  const deleteEntry = (entryId: string) => setEntries(prev => prev.filter(item => item.id !== entryId));
  const balanceFor = (personId: string) => entries.filter(e => e.personId === personId).reduce((sum, e) => sum + (e.type === 'receive' ? e.amount : -e.amount), 0);
  const totalReceivable = entries.filter(e => e.type === 'receive').reduce((s, e) => s + e.amount, 0);
  const totalPayable = entries.filter(e => e.type === 'give').reduce((s, e) => s + e.amount, 0);
  const totalExpenses = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
  const value = useMemo(() => ({ people, entries, addPerson, addEntry, deleteEntry, balanceFor, totalReceivable, totalPayable, totalExpenses, netProfit: totalReceivable - totalExpenses }), [people, entries, totalReceivable, totalPayable, totalExpenses]);
  return <KhataContext.Provider value={value}>{children}</KhataContext.Provider>;
}
export function useKhata() { const value = useContext(KhataContext); if (!value) throw new Error('KhataProvider is missing'); return value; }