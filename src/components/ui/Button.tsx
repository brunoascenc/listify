import React, { forwardRef } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

type Props = PressableProps & {
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
};

export const Button = forwardRef<View, Props>(
  ({ className, textClassName, disabled, children,  ...rest }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={`rounded-lg bg-blue-500 px-3 py-2${
          disabled ? 'opacity-60' : ''
        } ${className ?? ''}`}
        disabled={disabled}
        {...rest}
      >
        <Text
          className={`text-base font-semibold text-white ${
            textClassName ?? ''
          }`}
        >
          {children}
        </Text>
      </Pressable>
    );
  },
);

Button.displayName = 'Button';
