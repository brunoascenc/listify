import React, { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { Checkbox, CheckboxProps } from '@/components/ui/Checkbox';

type Props = CheckboxProps & {
  children?: React.ReactNode;
  selected: boolean;
  size?: number;
};

export const CheckItem = forwardRef<View, Props>(
  (
    { selected, children, ...rest },
    ref,
  ) => {
    return (
      <Checkbox
        ref={ref}
        selected={selected}
        {...rest}
      >
        <Text
          className={`text-sm ${
            selected ? 'text-slate-400 line-through' : 'text-slate-700'
          }`}
        >
          {children}
        </Text>
      </Checkbox>
    );
  },
);

CheckItem.displayName = 'CheckItem';
