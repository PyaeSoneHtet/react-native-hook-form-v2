# react-native-hook-form-v2

Reduce code complexity and simple code for react native. This libary is depended on react-hook-form.

## Installation

### Via npm
```sh
npm install react-native-hook-form-v2
```
### Via yarn
```sh
yarn install react-native-hook-form-v2
```

## Usage

```js
import React from 'react';
import {Button, View} from 'react-native';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import RNTextInput from 'react-native-hook-form-v2';

type FormValues = {
  email: string;
  password: string;
};

export default function Home() {
  const {...methods} = useForm();

  const onSubmit: SubmitHandler<FormValues | {}> = data => console.log(data);

  return (
    <View>
      <FormProvider {...methods}>
        <RNTextInput
          name="email"
          label="Email"
          placeholder="jon.doe@email.com"
          keyboardType="email-address"
          rules={{required: 'Email is required!'}}
          containerStyle={{marginTop: 20}}
        />
        <RNTextInput
          name={'password'}
          label="Password"
          placeholder="password"
          keyboardType="email-address"
          rules={{required: 'Password is required!'}}
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
    </View>
  );
}
```
## Props

| Props | Type  | Default  | Optional |  Description |
| ------- | --- | --- | --- | ----------- |
| containerStyle | StyleSheet | none | true |  Custom TextInput container styles |
| labelTextStyle | StyleSheet | none | true | Custom label styles  |
| errorTextStyle | StyleSheet | none | true | Custom error label styles |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
