import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useKhata, EntryType } from '@/context/KhataContext';

export function EntryModal({ visible, onClose, defaultType = 'receive' }: { visible: boolean; onClose: () => void; defaultType?: EntryType }) {
  const c = useColors(); const { people, addEntry } = useKhata();
  const [type, setType] = useState<EntryType>(defaultType); const [amount, setAmount] = useState(''); const [note, setNote] = useState(''); const [personId, setPersonId] = useState(people[0]?.id ?? '');
  const submit = () => { const value = Number(amount); if (!value) return; const person = people.find(p => p.id === personId); addEntry({ type, amount: value, note: note.trim() || (type === 'expense' ? 'ব্যবসার খরচ' : 'হিসাব এন্ট্রি'), personId: type === 'expense' ? undefined : personId || undefined, personName: type === 'expense' ? undefined : person?.name }); setAmount(''); setNote(''); onClose(); };
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={[s.sheet, { backgroundColor: c.card }]}>
          <View style={s.titleRow}><Text style={[s.title, { color: c.foreground }]}>নতুন হিসাব</Text><Pressable onPress={onClose}><Feather name="x" size={22} color={c.mutedForeground} /></Pressable></View>
          <View style={s.types}>{(['receive', 'give', 'expense'] as EntryType[]).map(t => <Pressable key={t} onPress={() => setType(t)} style={[s.type, { backgroundColor: type === t ? c.primary : c.muted }]}><Text style={{ color: type === t ? c.primaryForeground : c.foreground, fontWeight: '700' }}>{t === 'receive' ? 'পাওনা' : t === 'give' ? 'দেনা' : 'খরচ'}</Text></Pressable>)}</View>
          {type !== 'expense' && <><Text style={[s.label, { color: c.mutedForeground }]}>কার সাথে?</Text><View style={s.people}>{people.length ? people.map(p => <Pressable key={p.id} onPress={() => setPersonId(p.id)} style={[s.person, { borderColor: personId === p.id ? c.primary : c.border, backgroundColor: personId === p.id ? c.accent : c.background }]}><Text style={{ color: c.foreground }}>{p.name}</Text></Pressable>) : <Text style={{ color: c.mutedForeground }}>আগে একজন ব্যক্তি যোগ করুন</Text>}</View></>}
          <Text style={[s.label, { color: c.mutedForeground }]}>টাকার পরিমাণ</Text>
          <TextInput autoFocus keyboardType="numeric" value={amount} onChangeText={setAmount} placeholder="৳ 0" placeholderTextColor={c.mutedForeground} style={[s.input, { color: c.foreground, borderColor: c.input }]} />
          <TextInput value={note} onChangeText={setNote} placeholder="বিবরণ (ঐচ্ছিক)" placeholderTextColor={c.mutedForeground} style={[s.input, { color: c.foreground, borderColor: c.input }]} />
          <Pressable onPress={submit} style={[s.save, { backgroundColor: c.primary }]}><Text style={{ color: c.primaryForeground, fontWeight: '800', fontSize: 16 }}>হিসাব সংরক্ষণ করুন</Text></Pressable>
        </View>
      </View>
    </Modal>
  );
}
const s = StyleSheet.create({ overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000055' }, sheet: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, gap: 12 }, titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, title: { fontSize: 23, fontWeight: '800' }, types: { flexDirection: 'row', gap: 8 }, type: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: 18 }, label: { fontSize: 13, fontWeight: '700', marginTop: 4 }, people: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, person: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 16, borderWidth: 1 }, input: { borderWidth: 1, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 13, fontSize: 16 }, save: { alignItems: 'center', padding: 15, borderRadius: 15, marginTop: 4 } });