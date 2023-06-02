import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
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
      return (
        <View key={index} style={styles.ForumCard}>
          <View style={styles.imgView}>
            <Image
              style={styles.img}
              source={{
                uri: prefixPhoto + forum.photoUri.replace('\"',''),
              }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>זה השם של הפורום</Text>
            <Text style={styles.disc}>זה תיאור הפורום בלה בלה בלה </Text>
            <View style={styles.activ}>
              <Text>משתתפים:200 ||</Text>
              <Text>נוצר בתאריך : 14.14.14</Text>
            </View>
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
  scrolView: {},
  con: {
    marginTop: 75,
    // marginHorizontal: 15,
    borderColor: "#000",
    borderWidth: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ForumCard:{
    backgroundColor: "#baccbebf",
    borderWidth: 2,
    borderColor: "#3F493A",
    borderRadius: 30,
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:350,
    paddingVertical:20,
    height:150,
    
  },
  img:{
    borderColor: "#3F493A",
    borderWidth: 0.9,
    width: 117,
    borderRadius: 10,
    height:'95%',

  },
  content:{
    marginHorizontal:5,
    display:'flex',
    flexDirection:'column',
    alignContent:'center',
  },
  title:{
    fontSize:20,
    
  },
  disc:{
    fontSize:12,
  },
  activ:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-evenly',
    fontSize:12,
    marginTop:15,
  }
});
