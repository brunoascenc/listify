import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  className?: string;
  required?: boolean;
};

export const Input = forwardRef<TextInput, Props>(
  ({ label, error, required = false, className, ...rest }, ref) => {
    const baseClasses =
      'w-full bg-slate-100 text-base border border-slate-50 text-slate-900 rounded-2xl border-0 px-4 py-3';

    return (
      <View className="w-full">
        {label && (
          <Text className="mb-1 text-sm font-semibold text-slate-800">
            {label} {required ? "*" : ""}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={`${baseClasses} ${className ?? ''}`}
          placeholderTextColor="#94a3b8"
          returnKeyType="done"
          underlineColorAndroid="transparent"
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
