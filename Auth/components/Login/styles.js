import { StyleSheet } from 'react-native';
import { colors } from 'components/config';

export default StyleSheet.create({
  logoHead: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    flex: 2
  },
  logoView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableForgot: {
    justifyContent: 'center',
    borderStyle: 'solid',
    height: 48
  },
  barBottom: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
  signInBtn: {
    padding: 5
  },
  elements: {
    color: colors.red
  },
  noAccount: {
    color: colors.black
  }
});
