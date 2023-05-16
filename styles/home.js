import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";


const border = {
   borderWidth: 1,
   borderStyle: 'solid',
   borderColor: 'red',
}
const centerCol = {
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100%'
}
const col = {
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
}

const row = {
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
}

const styles = StyleSheet.create({

   initLoad: {

   },

   container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      backgroundColor: COLORS.lightWhite,
      gap: 9,

   },
   submitcontainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: '10%',
      padding: SIZES.small,
      backgroundColor: "#FFF",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
   },
   section: {
      marginTop: '10%',
      marginLeft: '5%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
   },

   sectionCol: {
      marginTop: '10%',
      marginLeft: '5%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
   },

   uploadButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '100%',
      height: 230,


   },

   imgBox: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 200,

   },



   image: {
      display: 'flex',
      width: '90%',
      height: 200,
      marginTop: '10%',

   },


   button: {
      width: '50%',
      backgroundColor: COLORS.white,
      height: 40,
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      marginLeft: SIZES.medium,
      borderRadius: SIZES.medium,
      marginRight: '10%',
      marginTop: '10%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
   },
   buttonModal: {
      width: '50%',
      backgroundColor: COLORS.white,
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      marginLeft: SIZES.medium,
      borderRadius: SIZES.medium,
      marginRight: '10%',
      marginTop: '10%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
      gap: 18

   },

   submit: {
      flex: 1,
      backgroundColor: COLORS.primary,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: SIZES.medium,
      borderRadius: SIZES.medium,
   },

   buttonText: {
      padding: 3
   },
   submitText: {
      color: COLORS.tertiary,
      padding: 3
   },

   input: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
      paddingLeft: 9


   },
   btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
      borderRadius: SIZES.small / 1.25,
   }),

   btnContainer: {
      width: 40,
      height: 40,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.small / 1.25,
      justifyContent: "center",
      alignItems: "center",
   },
   btnContainerModal: {
      width: 40,
      height: 40,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.small / 1.25,
      justifyContent: "center",
      alignItems: "center",
      marginTop: '3%',
      marginLeft: '4%',


   },


   modalContainer: {
      ...col,

      height: '100%',
   },

   modalContentContainer: {
      display: 'flex',
      marginTop: '10%',

   },
   text: {
      fontSize: 18,
      marginBottom: 18,

   },

   shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
   },

   scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: '10%',
      paddingBottom: '20%',
   },

   dropdown1BtnStyle: {
      width: '80%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
   },
   dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
   dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
   dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
   dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

})

export default styles;