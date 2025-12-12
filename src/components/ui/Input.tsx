import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  className?: string;
};

export const Input = forwardRef<TextInput, Props>(
  ({ label, error, className, ...rest }, ref) => {
    return (
      <View className="flex-1 bg">
        {label && (
          <Text className="mb-1 text-sm font-semibold text-slate-800">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={`w-full ${className ?? ''}`}
          placeholderTextColor="#94a3b8"
          returnKeyType="done"
          {...rest}
        />
        {error && (
          <Text className="mt-1 text-xs font-medium text-rose-500">
            {error}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';
