import React from 'react';
import { Button, View, Text } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { type SubmitHandler } from 'react-hook-form';
import RNTextInput from 'react-native-hook-form-v2';

type FormValues = {
  email: string;
  password: string;
};

export default function Home() {
  const [data, setData] = React.useState<FormValues | {}>();
  const { ...methods } = useForm();

  const onSubmit: SubmitHandler<FormValues | {}> = (data) => setData(data);

  return (
    <View style={{ marginHorizontal: 20 }}>
      <FormProvider {...methods}>
        <RNTextInput
          name="email"
          label="Email"
          placeholder="jon.doe@email.com"
          keyboardType="email-address"
          rules={{ required: 'Email is required!' }}
          containerStyle={{ marginTop: 20, marginBottom: 20 }}
        />
        <RNTextInput
          name={'password'}
          label="Password"
          placeholder="password"
          keyboardType="email-address"
          rules={{ required: 'Password is required!' }}
          onChangeText={(value: string) =>
            methods.setValue('password', value.replace(/[a-z,A-Z]/g, ''), {
              shouldValidate: true,
            })
          }
        />
      </FormProvider>
      <Button
        title="Login"
        color="red"
        onPress={methods.handleSubmit(onSubmit)}
      />

      <Text style={{ marginTop: 20 }}>{JSON.stringify(data)}</Text>
    </View>
  );
}
