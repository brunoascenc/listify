import React, { forwardRef } from 'react';
import { Pressable, PressableProps, View } from 'react-native';

type Props = PressableProps & {
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
};

export const IconButton = forwardRef<View, Props>(
  ({ className, textClassName, disabled, children,  ...rest }, ref) => {
    return (
      <Pressable
        ref={ref}
        className={`bg-blue-500 h-10 w-10 items-center justify-center rounded-full ${
          disabled ? 'opacity-60' : ''
        } ${className ?? ''}`}
        disabled={disabled}
        {...rest}
      >
        {children}
      </Pressable>
    );
  },
);

IconButton.displayName = 'IconButton';
