import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Input from '../Input';
import Button from '../Button';
import LandingCard from './LandingCard';
import LinkButton from './LinkButton';
import InputStyles from '../../styles/InputStyles';
import API from '../../api/API';
import { CardProps } from './types';
import { useUser } from '../../hooks/user';

function LoginCard({ switchCard }: CardProps): JSX.Element {
  const InputSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const [err, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const { dispatch } = useUser();

  type Credentials = {
    username: string;
    password: string;
  };

  async function login(credentials: Credentials) {
    try {
      const response = await API.login(credentials.username, credentials.password);

      // Store shit in local storage
      await AsyncStorage.setItem('jwt', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response));
      dispatch({
        type: 'updateUser',
        payload: response,
      });
      navigation.goBack();
      // onLogin();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <LandingCard title="Login" error={err}>
      <Formik
        validationSchema={InputSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={login}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          handleChange, handleBlur, handleSubmit, values, errors,
        }) => (
          <View>
            <Input
              style={InputStyles.landing}
              placeholder="Username"
              value={values.username}
              handleBlur={handleBlur}
              onChangeText={handleChange('username')}
              error={errors.username}
            />
            <Input
              style={InputStyles.landing}
              placeholder="Password"
              value={values.password}
              secureTextEntry
              handleBlur={handleBlur}
              onChangeText={handleChange('password')}
              error={errors.password}
            />
            <Button title="Login" onPress={handleSubmit} />
            <LinkButton title="Register" onPress={() => switchCard('register')} />
          </View>
        )}
      </Formik>
    </LandingCard>
  );
}

export default LoginCard;
