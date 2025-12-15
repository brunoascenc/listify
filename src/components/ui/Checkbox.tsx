import { CheckCircle2, Circle } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

export type CheckboxProps = PressableProps & {
  className?: string;
  children?: React.ReactNode;
  selected: boolean;
  size?: number;
  circleColor?: string;
};

export const Checkbox = forwardRef<View, CheckboxProps>(
  (
    { className, size, selected, circleColor, disabled, children, ...rest },
    ref,
  ) => {
    return (
      <Pressable
        ref={ref}
        className={`${disabled ? 'opacity-60' : ''} ${className ?? ''}`}
        {...rest}
      >
        {selected ? (
          <CheckCircle2 size={size ?? 18} color="#3b82f6" strokeWidth={2} />
        ) : (
          <Circle size={size ?? 18} style={{backgroundColor: "#fff", borderRadius: 60 }} color={circleColor ?? "#cbd5e1"} strokeWidth={2} />
        )}
        {children}
      </Pressable>
    );
  },
);

Checkbox.displayName = 'Checkbox';
