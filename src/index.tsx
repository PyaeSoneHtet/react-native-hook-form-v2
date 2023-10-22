import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { useController, useFormContext } from 'react-hook-form';
import { type UseControllerProps } from 'react-hook-form';
import {
  type StyleProp,
  type ViewStyle,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<ViewStyle>;
}

export default function RNTextInput(props: TextInputProps) {
  const formContext = useFormContext();
  const { name } = props;

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
  }

  return <ControlledInput {...props} />;
}

const ControlledInput = (props: TextInputProps) => {
  const {
    name,
    label,
    rules,
    defaultValue,
    containerStyle,
    labelTextStyle,
    errorTextStyle,
    ...inputProps
  } = props;
  const { field } = useController({ name, rules, defaultValue });
  const formContext = useFormContext();
  const { formState } = formContext;
  const hasError = Boolean(formState?.errors[name]);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelTextStyle]}>{label}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
      />
      <View style={[styles.errorContainer, errorTextStyle]}>
        {hasError && (
          <Text style={styles.error}>{formState?.errors[name]?.message}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    marginVertical: 5,
  },
  container: {},
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorContainer: {},
  error: {
    color: 'red',
  },
});
