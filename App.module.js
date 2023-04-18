import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    width: 390,
    height: "100%",
  },
  containerReg: {
    // position: "absolute",
    // width: 390,
    alignItems:'center',
    height: 729,
    left: 0,
    top: 205,
    marginTop:35,
  },
  list: {
    borderColor: "#3F493A",
    backgroundColor: "#ffffff80",
    borderWidth: 2,
    padding: 4,
    borderRadius: 22,
    height: 50,
    marginBottom: 15,

    
  },
  pickerItem: {
    position: "absolute",
    left: 1,
    right: 0,
    // fontWeight: 400,
    fontSize: 18,
    lineHight: 24,
    textAlign: "right",
    color: "#7C7C7C",
  },

  containerIn: {
    // position: "absolute",
    // width: 390,
    height: 729,
    alignItems:'center',
    // left: 0,
    top: 315,
  },
  containerInProfile: {
    position: "absolute",
    width: 390,
    height: 729,
    left: 0,
    top: 315,
    alignItems: "center",
  },
  Textinput: {
    width: 350,
    height: 40,
    // left: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 25,
    textAlign:'center'
  },
  back: {
    position: "absolute",
    right: 10,
    top: 33,
    height:50,
    width:50,
    zIndex:55,
    alignItems:'center',
    verticalAlign:'middle',
    alignContent:'flex-end',
    justifyContent:'center',


  },

  backSettings: {
    position: "absolute",
    right: 10,
    top: 40,
    height:50,
    width:50,
    zIndex:55,
    alignItems:'center',
    verticalAlign:'middle',
    alignContent:'flex-end',
    justifyContent:'center',


  },
  iconBack:{
    fontSize:40,
  },

  btnStyle: {
    width: 350,
    height: 50,
    left: 10,
    backgroundColor: "#7F9485",
    opacity: 0.8,
    borderRadius: 15,
  },
  btnStyleLogin: {
    width: 350,
    height: 50,
    backgroundColor: "#7F9485",
    opacity: 0.8,
    borderRadius: 15,
  },

  TextinputLeft: {
    textAlign: "left",
  },
  tinyLogo: {
    position: "absolute",
    left: 80,
    top: 20,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logout: {
    position: "absolute",
    left: 10,
    top: 42,
  },

  NavBar: {
    position: "absolute",
    bottom: 2,
    height: 60,
    backgroundColor: "white",
    width: "101.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconIdentification: {
    height: 40,
    width: 46,
    marginRight: 15,
    opacity: 1,
  },
  btnStyleProfile: {
    width: 350,
    height: 60,
    left: 5,
    backgroundColor: "#76937B",
    opacity: 0.6,
    borderRadius: 15,
    marginTop: 30,
  },

  btnStyleSettings: {
    width: 350,
    height: 60,
    backgroundColor: "#76937B",
    opacity: 0.6,
    borderRadius: 15,
    marginTop: 30,
  },
  ViewInButton: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
