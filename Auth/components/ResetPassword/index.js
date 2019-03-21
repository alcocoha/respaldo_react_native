import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Validator from 'validator';
import { isEmpty } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LogoTitle from 'components/LogoTitle';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Input from 'components/Input';

import { renderNode } from 'components/helpers';
import Icon from 'components/Icons/Icon';
import { colors } from 'components/config';

import styles from './styles';

const lockOpen = {
  type: 'material-community',
  size: 45,
  name: 'lock-open-outline',
  color: colors.grey4
};

class ResetPassword extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.intl.formatMessage({
      id: 'features.Auth.ResetPassoword.title'
    })
  });

  state = {
    data: { email: '' },
    errors: {}
  };

  validateState = data => {
    const {
      screenProps: { intl }
    } = this.props;
    const errors = {};
    const { email } = data;

    if (!Validator.isEmail(email)) {
      errors.email = intl.formatMessage({ id: 'common.forms.errors.email' });
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  onChange = name => value => {
    this.setState({
      errors: {},
      data: { ...this.state.data, [name]: value }
    });
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
      this.props.resetRequest(data);
    }
  };

  render() {
    const {
      screenProps: { intl }
    } = this.props;
    const { data, errors } = this.state;
    return (
      <Layout padder>
        <View style={[styles.logoHead]}>
          <View style={[styles.logoView]}>
            <LogoTitle />
          </View>
        </View>
        <KeyboardAwareScrollView>
          <View style={[styles.textContainer]}>
            {renderNode(Icon, lockOpen)}
            <Text style={[styles.subTitle]}>
              {intl.formatMessage({
                id: 'features.Auth.ResetPassoword.subTitle'
              })}
            </Text>
            <Text style={[styles.text]}>
              {intl.formatMessage({
                id: 'features.Auth.ResetPassoword.text'
              })}
            </Text>
          </View>
          <View style={[styles.textContainer]}>
            <Input
              label={intl.formatMessage({ id: 'common.forms.label.email' })}
              placeholder={intl.formatMessage({
                id: 'common.forms.placeholder.email'
              })}
              keyboardType={'email-address'}
              value={data.email}
              errorMessage={errors.email}
              onChangeText={this.onChange('email')}
            />
            <Button
              title={intl.formatMessage({
                id: 'common.forms.placeholder.button'
              })}
              onPress={this.handlePressLogin}
            />
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    );
  }
}

export default ResetPassword;
