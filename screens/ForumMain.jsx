import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import bg from "../assets/ForumsBG.png";
import NavBar from "../functional componet/navBar";

export default function ForumMain({ navigation, route }) {
  const [ForumsList, setForumsList] = useState(0);
  console.log("Forum Main Route --->", route.params);
  const api = `https://proj.ruppin.ac.il/cgroup41/prod/api/SocialForums/GetForumsById&Follow?userID=${route.params.userID}`;
  let RenderCompenent = 0;
  const prefixPhoto = "https://proj.ruppin.ac.il/cgroup41/prod/uploadedFiles/";

  useEffect(() => {
    console.log("onload in Forum Main");
    fetch(api, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => {
          //console.log("fetch POST= ", JSON.stringify(result));
          console.log("result before state", result);
          setForumsList(result);
        },
        (error) => {
          console.log("err get Forums ---> =", error);
        }
      );

    return () => {
      second;
    };
  }, []);

  if (ForumsList != 0) {
    RenderCompenent = ForumsList.map((forum, index) => {
      console.log("One forum--->", forum, index);
      return (
        <View key={forum.socialForumId} style={styles.ForumCard}>
          <View style={styles.imgView}>
            <Image
              source={{
                uri: prefixPhoto + forum.photoUri.replace('"', ""),
              }}
              style={styles.img}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{forum.socialForumName}</Text>
            <Text style={styles.disc}>{forum.socialForumDiscription}</Text>
            <Text style={styles.activtxt}>
              נוצר בתאריך: {forum.socialForumCreatedAt.slice(0, 9)}
            </Text>
          </View>
          <View style={styles.btnWrap}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txtbtn}>הכניסה מכאן</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  return (
    <>
      <ImageBackground
        style={{ width: "100%", height: "100%", zIndex: -1 }}
        source={bg}
      >
        <View style={styles.con}>
          <ScrollView style={styles.scrolView}>
            {RenderCompenent != 0 ? RenderCompenent : <Text>Loading...</Text>}
          </ScrollView>
        </View>
      </ImageBackground>
      <NavBar
        isExpert={route.params.isExpert}
        userID={route.params.userID}
      ></NavBar>
    </>
  );
}

const styles = StyleSheet.create({
  scrolView: {
    width: "100%",
    // borderColor: "#000",
    // borderWidth: 2,
    // display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingHorizontal: 45,
  },
  con: {
    marginTop: 75,
    // marginHorizontal: 15,
    marginBottom: 50,
  },
  ForumCard: {
    backgroundColor: "#EBFDEB75",
    borderWidth: 2,
    borderColor: "#3F493A",
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
    paddingVertical: 25,
    height: 350,
    marginVertical: 30,
  },
  img: {
    borderColor: "#3F493A",
    borderWidth: 0.9,
    borderRadius: 50,
    height: 135,
    width: 135,
  },
  imgView: {
    // marginLeft: 25,
    // borderWidth:2,
    // borderColor:'#000',
    alignItems: "center",
  },
  content: {
    // marginHorizontal: 5,
    // display: "flex",
    // flexDirection: "column",
    // alignContent: "center",
    // marginLeft: 25,
    // marginBottom: 15,
    // borderWidth: 2,
    // borderColor: "#000",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  disc: {
    fontSize: 12,
    marginTop: 15,
    textAlign: "center",
    marginHorizontal: 5,
  },
  activ: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "relative",
    top: 5,
  },
  activtxt: {
    fontSize: 12,
    marginRight: 15,
    textAlign: "center",
    marginTop: 25,
  },
  btnWrap: {
    // borderWidth: 2,
    // borderColor: "#000",
    alignItems:'center',
    marginVertical:10,
  },
  btn: {
    borderColor: "#3F493A",
    borderWidth:1,
    backgroundColor: "#9EB98B75",
    opacity:0.8,
    width:190,
    paddingVertical:10,
    borderRadius:15,

  },
  txtbtn:{
    fontSize:18,
    textAlign:'center'
  }
});
