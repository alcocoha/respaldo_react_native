import { StyleSheet } from "react-native";
import { sizes } from "components/config";
import { FONT_GUIDELINE } from 'components/config/fonts'; 


export default StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: "row"
  },
  iconContainer: {
    flex: 1
  },
  formContainer: {
    flex: 6,
    marginBottom: sizes.baseline * 4
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: sizes.baseline
  },
  optionalText:{
    marginLeft: 5,
    ...StyleSheet.flatten([FONT_GUIDELINE.caption]),
  }
});
