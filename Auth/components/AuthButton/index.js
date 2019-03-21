import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

const AuthButton = ({ intl, navigation, isLoggedIn }) => {
  loginNav = () => {
    navigation.navigate({ routeName: 'Login' });
  };
  profileNav = () => {
    navigation.navigate({ routeName: 'Profile' });
  };
  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <TouchableOpacity onPress={this.loginNav}>
          <Text style={styles.elements}>
            {intl.formatMessage({
              id: 'common.label.enter'
            })}
          </Text>
        </TouchableOpacity>
      )}
      {isLoggedIn && (
        <TouchableOpacity onPress={this.profileNav}>
          <Text style={styles.elements}>
            {intl.formatMessage({
              id: 'features.UserProfile.myAccount.title'
            })}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthButton;
