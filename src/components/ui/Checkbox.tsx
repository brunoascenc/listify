import { CheckCircle2, Circle } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

export type CheckboxProps = PressableProps & {
  className?: string;
  children?: React.ReactNode;
  selected: boolean;
  size?: number;
};

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    { className, size, selected, disabled, children, ...rest },
    ref,
  ) => {
    return (
      <Pressable
        ref={ref}
        className={`${disabled ? 'opacity-60' : ''} ${className ?? ''}`}
        {...rest}
      >
        {selected ? (
          <CheckCircle2 size={size ?? 18} color="#3b82f6" strokeWidth={2.5} />
        ) : (
          <Circle size={size ?? 18} color="#cbd5e1" strokeWidth={2.5} />
        )}
        {children}
      </Pressable>
    );
  },
);

Checkbox.displayName = 'Checkbox';
