import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { CalendarClock } from 'lucide-react-native';
import { format } from 'date-fns';
import { CustomModal } from '@/components/ui/CustomModal';
import { CalendarPicker } from '@/components/ui/CalendarPicker';
import { Button } from '@/components/ui/Button';
import {
  formatDateTimeDisplay,
  parseDateTimeInput,
} from '@/utils/tasks/dates';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const pad = (val: string) => {
  if (!val) return '';
  return val.padStart(2, '0').slice(0, 2);
};

export const DatePicker = ({
  label,
  value,
  placeholder = 'Selecionar data e hora',
  onChange,
}: Props) => {
  const parsedInitial = parseDateTimeInput(value) ?? null;
  const initialDate = parsedInitial || new Date();
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      initialDate.getDate(),
    ),
  );
  const [hour, setHour] = useState(parsedInitial ? format(initialDate, 'HH') : '00');
  const [minute, setMinute] = useState(parsedInitial ? format(initialDate, 'mm') : '00');

  useEffect(() => {
    const parsed = parseDateTimeInput(value) ?? null;
    const base = parsed || new Date();
    const normalized = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
    );
    const baseHour = parsed ? format(base, 'HH') : '00';
    const baseMinute = parsed ? format(base, 'mm') : '00';
    setSelectedDate(normalized);
    setHour(baseHour);
    setMinute(baseMinute);
  }, [value]);

  const handleConfirm = () => {
    const hh = pad(hour || '00');
    const mm = pad(minute || '00');
    const merged = new Date(selectedDate);
    const safeHour = Math.min(23, Math.max(0, Number(hh) || 0));
    const safeMinute = Math.min(59, Math.max(0, Number(mm) || 0));
    merged.setHours(safeHour, safeMinute, 0, 0);
    onChange(formatDateTimeDisplay(merged));
    setVisible(false);
  };

  return (
    <View>
      {label && (
        <Text className="mb-1 text-sm font-semibold text-slate-800">
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => setVisible(true)}
        className="flex-row rounded-2xl bg-slate-100 px-3 py-2 justify-between items-center"
      >
        <View>
          <Text className="text-base font-semibold text-slate-900">
            {value || placeholder}
          </Text>
          <Text className="text-xs text-slate-500">
            Toque para abrir o calendario
          </Text>
        </View>
        <View className="rounded-full bg-slate-100 p-2">
          <CalendarClock size={18} color="#6780f1" />
        </View>
      </Pressable>

      <CustomModal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Selecionar data e hora"
        footer={
          <Button onPress={handleConfirm} className="w/full bg-blue-500">
            Confirmar
          </Button>
        }
      >
        <CalendarPicker
          selectedDate={format(selectedDate, 'yyyy-MM-dd')}
          onSelectDate={dateString => {
            const [y, m, d] = dateString.split('-').map(Number);
            const updated = new Date(selectedDate);
            updated.setFullYear(y, m - 1, d);
            setSelectedDate(updated);
          }}
        />
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="mb-1 text-sm font-semibold text-slate-800">
              Hora
            </Text>
            <TextInput
              value={hour}
              onChangeText={text => setHour(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={2}
              placeholder="HH"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900"
              placeholderTextColor="#94a3b8"
            />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-sm font-semibold text-slate-800">
              Minutos
            </Text>
            <TextInput
              value={minute}
              onChangeText={text => setMinute(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              maxLength={2}
              placeholder="MM"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};
