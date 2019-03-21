import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { isEmpty } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'components/Button';
import Input from 'components/Input';
import isEmail from 'validator/lib/isEmail';
import Layout from 'components/Layout';
import LogoTitle from 'components/LogoTitle';
import { validatePassword } from 'utils/validator';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import styles from './styles';

class Login extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.intl.formatMessage({ id: 'features.Auth.Login.title' })
  });

  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  onChange = name => value => {
    this.setState({
      errors: {},
      data: { ...this.state.data, [name]: value }
    });
  };

  validateState = data => {
    const {
      screenProps: { intl }
    } = this.props;
    const { username, password } = data;
    const errors = {};

    if (!isEmail(username)) {
      errors.username = intl.formatMessage({ id: 'common.forms.errors.email' });
    }

    /*if (!validatePassword(password)) {
      errors.password = intl.formatMessage({
        id: 'common.forms.errors.password'
      });
    }*/
    
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  isValid = () => {
    const { data } = this.state;
    const { errors, isValid } = this.validateState(data);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  handlePressLogin = () => {
    const { data } = this.state;

    if (this.isValid()) {
      this.props.loginRequest(data);
    }
  };

  render() {
    const {
      navigation,
      screenProps: { intl }
    } = this.props;
    const { sending, error, shoppingCart } = this.props;
    const { data, errors } = this.state;

    return (
      <Layout>
        <Layout padder>
          <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.logoHead]}>
              <View style={[styles.logoView]}>
                <LogoTitle />
                <Text>
                  {intl.formatMessage({ id: 'features.Auth.Login.subTitle' })}
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Input
                label={intl.formatMessage({ id: 'common.forms.label.email' })}
                placeholder={intl.formatMessage({
                  id: 'common.forms.placeholder.email'
                })}
                keyboardType={'email-address'}
                value={data.username}
                editable={!sending}
                errorMessage={errors.username}
                onChangeText={this.onChange('username')}
              />
              <Input
                label={intl.formatMessage({
                  id: 'common.forms.label.password'
                })}
                placeholder={intl.formatMessage({
                  id: 'common.forms.placeholder.password'
                })}
                secureTextEntry
                value={data.password}
                editable={!sending}
                onChangeText={this.onChange('password')}
                errorMessage={errors.password}
              />
              <View style={[styles.touchableForgot]}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    this.props.navigation.navigate('ResetPassword')
                  }
                >
                  <Text
                    style={{ textAlign: 'left', marginTop: 6, marginRight: 5 }}
                  >
                    {intl.formatMessage({
                      id: 'common.forms.label.forgotPassword'
                    })}
                  </Text>
                  <Icon name={'lock-open-outline'} size={25} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <Button
                title={intl.formatMessage({
                  id: 'common.forms.placeholder.button'
                })}
                onPress={this.handlePressLogin}
                disabled={sending}
                loading={sending}
              />
            </View>
          </KeyboardAwareScrollView>
        </Layout>
        <View style={styles.barBottom}>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() =>
              this.props.navigation.navigate({ routeName: 'Signup' })
            }
          >
            <Text style={styles.elements}>
              {intl.formatMessage({
                id: 'features.Auth.Signup.title'
              })}
            </Text>
          </TouchableOpacity>

          {shoppingCart > 0 && (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() =>
                this.props.navigation.navigate({ routeName: 'PassengerData' })
              }
            >
              <Text style={styles.noAccount}>
                {intl.formatMessage({
                  id: 'features.Auth.Signup.noAccount'
                })}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Layout>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  sending: PropTypes.bool.isRequired
};

export default Login;
