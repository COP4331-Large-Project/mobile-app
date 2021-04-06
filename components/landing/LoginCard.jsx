import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { PropTypes } from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import LandingCard from './LandingCard';
import LinkButton from './LinkButton';
import InputStyles from '../../styles/InputStyles';

function LoginCard({ switchCard }) {
  function login() {
    switchCard('register');
  }

  return (
    <LandingCard title="Login">
      <Formik>
        <View>
          <Input style={InputStyles.landing} placeholder="Username" />
          <Input style={InputStyles.landing} placeholder="Password" secureTextEntry />
          <Button title="Login" onPress={login} />
          <LinkButton title="Register" onPress={() => switchCard('register')} />
        </View>
      </Formik>
    </LandingCard>
  );
}

LoginCard.defaultProps = {
  switchCard: () => { },
};

LoginCard.propTypes = {
  switchCard: PropTypes.func,
};

export default LoginCard;
