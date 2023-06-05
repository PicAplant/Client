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
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ForumPage({ navigation, route }) {
  const [ForumsList, setForumsList] = useState(0);
  const prefixPhoto = "https://proj.ruppin.ac.il/cgroup41/prod/uploadedFiles/";
  const [TheForum, setTheForum] = useState(0);

  let forumDetail = {};
  useEffect(() => {
    console.log("onload in ForumPage this is the Route", route.params);
    console.log("route.params.forum: --->", route.params.forum);
    console.log("Forum_v2?--->", route.params.forum_v2);
    if (route.params.forum_v2 == undefined) {
      forumDetail = route.params.forum;
      setTheForum(route.params.forum);
      setForumsList(1);
      console.log("sucsses parameters suckit -->", forumDetail);
    } else {
      let localforumid = route.params.forum_v2.split("forumID:");
      console.log("what is this ? -->", localforumid[1]);
      const apiGetForum = `https://proj.ruppin.ac.il/cgroup41/prod/api/SocialForums/GetForumsById&Follow?userID=${route.params.user.userID}`;
      fetch(apiGetForum, {
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
            setForumsList(result);
            for (let i = 0; i < result.length; i++) {
              const forum = result[i];
              // console.log('what is this 2  ? -->',forum);
              if (forum.socialForumId == localforumid[1]) {
                // console.log("Found forum! -->", forum);
                forumDetail = forum;
                setTheForum(forum);
              }
            }
          },
          (error) => {
            console.log("err get Forums ---> =", error);
          }
        );
    }
  }, []);

  const scalbleFontText = (text) => {
    console.log(text.length);
    if (text.length <= 8) {
      return <Text style={{ fontSize: 25,backgroundColor:'#90AE9580',padding:7,borderRadius:12 }}>{text}</Text>;
    } else if (text.length > 24) {
      return <Text style={{ fontSize: 14 ,backgroundColor:'#90AE9580',padding:7,borderRadius:12}}>{text}</Text>;
    } else if (text.length > 18) {
      return <Text style={{ fontSize: 17,backgroundColor:'#90AE9580',padding:7,borderRadius:12 }}>{text}</Text>;
    } else if (text.length > 14) {
      return <Text style={{ fontSize: 20,backgroundColor:'#90AE9580',padding:7,borderRadius:12 }}>{text}</Text>;
    } else if (text.length > 8) {
      return <Text style={{ fontSize: 22,backgroundColor:'#90AE9580',padding:7,borderRadius:12 }}>{text}</Text>;
    }
  };

  const HeaderCompenent = () => {
    if (TheForum != 0) {
      console.log("is need to Render -->", TheForum);
      return (
        <View style={styles.HeaderForum}>
          <View style={styles.Row}>
            <View style={styles.Col}>
              <Image
                style={styles.Image}
                source={{
                  uri: prefixPhoto + TheForum.photoUri.replace('"', ""),
                }}
              />
            </View>
            <View style={styles.Col}>
              <Text style={styles.Greet}>ברוכים הבאים לפורום</Text>
              {scalbleFontText(TheForum.socialForumName)}
            </View>
          </View>
          <View style={styles.content}>
            <Text textAlign="right">{TheForum.socialForumDiscription}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <>
      <ImageBackground
        style={{ width: "100%", height: "100%", zIndex: -1 }}
        source={bg}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.navigate("ForumMain", {
              isExpert: route.params.user.isExpert,
              userID: route.params.user.userID,
            });
          }}
        >
          <Ionicons
            style={styles.iconBack}
            name="return-up-back-outline"
            color="#127533"
          ></Ionicons>
        </TouchableOpacity>
        {ForumsList != 0 ? <HeaderCompenent /> : ""}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    fontSize: 50,
    fontWeight: 900,
  },
  back: {
    position: "absolute",
    right: 10,
    top: 26,
    height: 50,
    width: 50,
    zIndex: 55,
    alignItems: "center",
    verticalAlign: "middle",
    alignContent: "flex-end",
    justifyContent: "center",
  },
  HeaderForum: {
    backgroundColor: "#EBFDEB70",
    borderColor: "#90AE95",
    borderWidth: 2,
    width: window.innerWidth,
    height: 265,
    marginTop: 75,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  Row: {
    // borderColor: "#000",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  },
  Image: {
    width: 110,
    height: 110,
    borderRadius: 25,
    borderColor: "#889480",
    borderWidth: 1.1,
  },

  Col: {
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    // borderColor: "#000",
    // borderWidth: 1,
    marginHorizontal:10,
    marginTop:15,

  },
  Greet: {
    fontSize: 12,
    textAlign: "center",
    // position:'relative',
    // top:55,
    // left:35,
    marginBottom:10,
  },
});
