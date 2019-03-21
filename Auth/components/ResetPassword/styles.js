import { StyleSheet } from 'react-native';
import { FONT_GUIDELINE } from 'components/config/fonts';
import { colors, sizes } from 'components/config';

export default StyleSheet.create({
  logoHead: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: sizes.baseline,
    marginBottom: sizes.baseline
  },
  logoView: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    marginTop: sizes.baseline,
    marginBottom: sizes.baseline
  },
  subTitle: {
    ...StyleSheet.flatten([FONT_GUIDELINE.title]),
    marginTop: sizes.baseline,
    textAlign: 'center'
  },
  text: {
    ...StyleSheet.flatten([FONT_GUIDELINE.subHeader]),
    marginTop: sizes.baseline,
    textAlign: 'center'
  }
});
