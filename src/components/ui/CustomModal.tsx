import { X } from 'lucide-react-native';
import { ReactNode } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export const CustomModal = ({
  visible,
  onClose,
  title,
  children,
  footer,
}: Props) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-slate-900/40"
        onPress={onClose}
        accessibilityLabel="Fechar modal"
      >
        <Pressable
          className="mt-auto rounded-t-3xl bg-white p-5 shadow-lg"
          onPress={e => e.stopPropagation()}
        >
          <View className="mb-3 flex-row justify-between">
            <Text className="text-lg font-semibold text-slate-900">
              {title}
            </Text>
            <Pressable onPress={onClose}>
              <X />
            </Pressable>
          </View>
          <View className="gap-4">{children}</View>
          {footer && <View className="mt-4">{footer}</View>}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
