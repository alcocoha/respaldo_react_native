import { isEmpty, pick, values, each, isEqual } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, Switch } from 'react-native';
import Birthdate from 'components/Birthdate';
import Button from 'components/Button';
import CountryInput from 'features/Countries/containers/CountryInput';
import DocumentType from 'components/DocumentType';
import Gender from 'components/Gender';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Input from 'components/Input';
import Layout from 'components/Layout';
import PhoneInput from 'features/Countries/containers/PhoneInput';
import Prefixes from 'components/Prefixes';
import React, { Component } from 'react';
import Telephone from 'components/Telephone';
import { validatePassword } from 'utils/validator';
import Validator from 'validator';

import DocumentDate from '../../../../components/DocumentDate';
import styles from './styles';
import { isAlphaWithSpaces } from '../../../../utils/validator';

class Signup extends React.PureComponent {
  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.intl.formatMessage({ id: 'features.Auth.Signup.title' })
  });

  state = {
    data: {
      name: '',
      second_name: '',
      lastname: '',
      second_lastname: '',
      code_country: 'VE',
      phone_number: '',
      birthdate: '',
      gender_id: '',
      type_phone_id: '',
      prefix: '',
      document_type_id: '',
      document_number: '',
      expiration: '',
      indemnisation: false,
      marketing: false,
      username: '',
      username_confirmation: '',
      password: '',
      password_confirmation: '',
      terms: false
    },
    errors: {}
  };
  /*
    state = {
      data: {
        name: 'Carlos',
        second_name: '',
        lastname: 'Soto',
        second_lastname: 'Vela',
        code_country: 'VE',
        phone_number: '15545298425',
        birthdate: '1995-10-12',
        gender_id: '',
        type_phone_id: '',
        prefix: '',
        document_type_id: 1,
        document_number: '15975364232',
        expiration: '2020-12-12',
        indemnisation: false,
        marketing: false,
        username: 'W8@w.com',
        username_confirmation: 'W8@w.com',
        password: 'Nurun.18',
        password_confirmation: 'Nurun.18',
        terms: true
      },
      errors: {}
    };
  */

  validateState = data => {
    const {
      screenProps: { intl }
    } = this.props;
    const errors = {};
    const onlyString = pick(data, ['name', 'lastname']);

    const notRequired = pick(data, ['second_name']);
    const required = pick(data, ['second_lastname', 'phone_number', 'expiration', 'birthdate']);
    const {
      password,
      password_confirmation,
      username,
      username_confirmation,
      terms,
      document_number
    } = data;

    each(onlyString, (value, key) => {
      if (Validator.isEmpty(value) || !isAlphaWithSpaces(value)) {
        errors[key] = intl.formatMessage({
          id: 'common.forms.errors.onlyLetters'
        });
      }
    });

    each(required, (value, key) => {
      if (Validator.isEmpty(value)) {
        errors[key] = intl.formatMessage({ id: 'common.forms.errors.empty' });
      }
    });

    each(notRequired, (value, key) => {
      if (value && !isAlphaWithSpaces(value)) {
        errors[key] = intl.formatMessage({
          id: 'common.forms.errors.onlyLetters'
        });
      }
    });

    if (!Validator.isEmail(username)) {
      errors.username = intl.formatMessage({ id: 'common.forms.errors.email' });
    }

    if (!isEqual(username, username_confirmation)) {
      errors.username = intl.formatMessage({
        id: 'common.forms.errors.emailMatch'
      });
    }

    if (!validatePassword(password)) {
      errors.password = intl.formatMessage({
        id: 'common.forms.errors.password'
      });
    }

    if (!isEqual(password, password_confirmation)) {
      errors.password = intl.formatMessage({
        id: 'common.forms.errors.passworMatch'
      });
    }

    const docNumber = document_number.replace(/\s/g, '');
    if (
      !(
        Validator.isAlphanumeric(docNumber) &&
        Validator.isLength(docNumber, { min: 10, max: 20 })
      )
    ) {
      errors.document_number = intl.formatMessage({
        id: 'common.forms.errors.docNumber'
      });
    }
    if (!terms) {
      errors.terms = intl.formatMessage({ id: 'common.forms.errors.terms' });
    }

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

  onChange = name => value => {
    if (
      name == 'name' ||
      name == 'second_name' ||
      name == 'lastname' ||
      name == 'second_lastname'
    ) {
      value = value.replace(/\d+/g, '');
    }

    this.setState((prevState, props) => ({
      errors: { ...prevState.errors, [name]: null },
      data: { ...prevState.data, [name]: value }
    }));
  };

  handlePressSignup = () => {
    const { data } = this.state;
    if (this.isValid()) {
      this.props.registerRequest(data);
    }
  };

  render() {
    const {
      screenProps: { intl }
    } = this.props;
    const { data, errors } = this.state;
    const { sending } = this.props;
    return (
      <Layout padder>
        <KeyboardAwareScrollView>
          <View>
            <View style={[styles.sectionContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name={'account'} size={25} />
              </View>
              <View style={[styles.formContainer]}>
                <Prefixes onChange={this.onChange('prefix')} />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.name'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.name'
                  })}
                  value={data.name}
                  onChangeText={this.onChange('name')}
                  errorMessage={errors.name}
                />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.secondName'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.secondName'
                  })}
                  value={data.second_name}
                  onChangeText={this.onChange('second_name')}
                  errorMessage={errors.second_name}
                />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.lastname'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.lastname'
                  })}
                  value={data.lastname}
                  onChangeText={this.onChange('lastname')}
                  errorMessage={errors.lastname}
                />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.secondLastname'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.secondLastname'
                  })}
                  value={data.second_lastname}
                  onChangeText={this.onChange('second_lastname')}
                  errorMessage={errors.second_lastname}
                />
                <Birthdate
                  onChange={this.onChange('birthdate')}
                  errorMessage={errors.birthdate}
                />
                <Gender onChange={this.onChange('gender_id')} />
                <PhoneInput
                  onChange={this.onChange('phone_number')}
                  errorMessage={errors.phone_number}
                />
                <Telephone onChange={this.onChange('type_phone_id')} />
              </View>
            </View>
            <View style={[styles.sectionContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name={'file-document'} size={25} />
              </View>
              <View style={[styles.formContainer]}>
                <DocumentType onChange={this.onChange('document_type_id')} />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.documentNumber'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.documentNumber'
                  })}
                  value={data.document_number}
                  onChangeText={this.onChange('document_number')}
                  errorMessage={errors.document_number}
                />
                <CountryInput
                  onChange={this.onChange('code_country')}
                  label={intl.formatMessage({
                    id: 'common.forms.placeholder.documentCountry'
                  })}
                />
                <DocumentDate
                  onChange={this.onChange('expiration')}
                  errorMessage={errors.expiration}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10
                  }}
                >
                  <Switch
                    value={data.indemnisation}
                    onValueChange={this.onChange('indemnisation')}
                  />
                  <View>
                    <Text>
                      {intl.formatMessage({
                        id: 'common.forms.label.compensation'
                      })}
                    </Text>
                    <Text style={styles.optionalText}>
                      {intl.formatMessage({
                        id: 'common.forms.label.optional'
                      })}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Switch
                    value={data.marketing}
                    onValueChange={this.onChange('marketing')}
                  />
                  <View>
                    <Text>
                      {intl.formatMessage({
                        id: 'common.forms.label.marketing'
                      })}
                    </Text>
                    <Text style={styles.optionalText}>
                      {intl.formatMessage({
                        id: 'common.forms.label.optional'
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.sectionContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name={'account-card-details'} size={25} />
              </View>
              <View style={[styles.formContainer]}>
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.email'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.email'
                  })}
                  keyboardType={'email-address'}
                  onChangeText={this.onChange('username')}
                  value={data.username}
                  errorMessage={errors.username}
                />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.emailConfirmation'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.emailConfirmation'
                  })}
                  keyboardType={'email-address'}
                  onChangeText={this.onChange('username_confirmation')}
                  value={data.username_confirmation}
                  errorMessage={errors.username_confirmation}
                />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.password'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.password'
                  })}
                  secureTextEntry
                  onChangeText={this.onChange('password')}
                  value={data.password}
                  errorMessage={errors.password}
                />
                <Input
                  label={intl.formatMessage({
                    id: 'common.forms.label.passwordConfirmation'
                  })}
                  placeholder={intl.formatMessage({
                    id: 'common.forms.placeholder.passwordConfirmation'
                  })}
                  secureTextEntry
                  onChangeText={this.onChange('password_confirmation')}
                  value={data.password_confirmation}
                  errorMessage={errors.password_confirmation}
                />
                <View style={[styles.termsContainer]}>
                  <Switch
                    value={data.terms}
                    onValueChange={this.onChange('terms')}
                  />
                  <Text style={[errors.terms && { color: 'red' }]}>
                    {intl.formatMessage({
                      id: 'common.forms.label.terms'
                    })}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              title={intl.formatMessage({ id: 'features.Auth.Signup.title' })}
              onPress={this.handlePressSignup}
              disabled={sending}
              loading={sending}
            />
          </View>
        </KeyboardAwareScrollView>
      </Layout>
    );
  }
}

export default Signup;
