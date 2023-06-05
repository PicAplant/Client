import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import bg from "../assets/ForumsBG.png";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ForumPage({ navigation, route }) {
  const [ForumsList, setForumsList] = useState(0);
  const prefixPhoto = "https://proj.ruppin.ac.il/cgroup41/prod/uploadedFiles/";
  const [TheForum, setTheForum] = useState(0);
  const [ReRender, setReRender] = useState(false);
  const [PostList, setPostList] = useState(0);

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
      GetPost(forumDetail.socialForumId);
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
                if ((forum.follow = "yes")) {
                  setReRender(true);
                }
                GetPost(forum.socialForumId);
              }
            }
          },
          (error) => {
            console.log("err get Forums ---> =", error);
          }
        );
    }
  }, []);

  const GetPost = (forumid) => {
    console.log("is undefind ?", forumid);
    const PostApi = `https://proj.ruppin.ac.il/cgroup41/prod/api/SocialForums/GetPosts?forumID=${forumid}`;
    fetch(PostApi, {
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
          console.log("Good result from Get Post -->", JSON.stringify(result));
          setPostList(result);
        },
        (error) => {
          console.log("err get Post of Forum ! ---> ", error);
        }
      );
  };

  const scalbleFontText = (text) => {
    // console.log(text.length);
    if (text.length <= 8) {
      return (
        <Text
          style={{
            fontSize: 25,
            backgroundColor: "#90AE9580",
            padding: 7,
            borderRadius: 12,
          }}
        >
          {text}
        </Text>
      );
    } else if (text.length > 24) {
      return (
        <Text
          style={{
            fontSize: 14,
            backgroundColor: "#90AE9580",
            padding: 7,
            borderRadius: 12,
          }}
        >
          {text}
        </Text>
      );
    } else if (text.length > 18) {
      return (
        <Text
          style={{
            fontSize: 17,
            backgroundColor: "#90AE9580",
            padding: 7,
            borderRadius: 12,
          }}
        >
          {text}
        </Text>
      );
    } else if (text.length > 14) {
      return (
        <Text
          style={{
            fontSize: 20,
            backgroundColor: "#90AE9580",
            padding: 7,
            borderRadius: 12,
          }}
        >
          {text}
        </Text>
      );
    } else if (text.length > 8) {
      return (
        <Text
          style={{
            fontSize: 22,
            backgroundColor: "#90AE9580",
            padding: 7,
            borderRadius: 12,
          }}
        >
          {text}
        </Text>
      );
    }
  };
  const isFollow = (state) => {
    if (state) {
      return <Text style={styles.BTNtitle}>הסר מעקב</Text>;
    } else {
      return <Text style={styles.BTNtitle}>הצטרפות</Text>;
    }
  };
  const FolloworUnfollow = (userid, forumid) => {
    const FolApi = `https://proj.ruppin.ac.il/cgroup41/prod/api/SocialForums/FollowThis?userID=${userid}&forumID=${forumid}`;
    fetch(FolApi, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then(
        (result) => {
          //console.log("fetch POST= ", JSON.stringify(result));
          console.log(
            "Good result from the server about the follow need to render the button",
            result
          );
          //change state !
          setReRender((prev) => !prev);
          if (ReRender) {
            Alert.alert("הצטרפת בהצלחה");
          } else {
            Alert.alert("המעקב הוסר בהצלחה");
          }
        },
        (error) => {
          console.log("err from Follow or unFollow Fetch ---> =", error);
        }
      );
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
            <Text textAlign="justify">{TheForum.socialForumDiscription}</Text>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity
              style={ReRender ? styles.BTN : styles.BTN2}
              onPress={() => {
                console.log(
                  "you pressed it -->",
                  TheForum.socialForumId,
                  route.params.user.userID
                );
                FolloworUnfollow(
                  route.params.user.userID,
                  TheForum.socialForumId
                );
              }}
            >
              {isFollow(!ReRender)}
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const SinglePost = (props) => {
    return (
      <View style={styles.cardPost}>
        <View style={styles.imgView}>
          <Image
            style={styles.profilePhoto}
            source={{ uri: prefixPhoto + props.uri.replace('"', "") }}
          />
        </View>
        <View style={styles.content2}>
          <Text style={styles.content2txt}>{props.content}</Text>
        </View>
        <View style={styles.userdetail}>
          <Text style={{textAlign:'center'}}>{props.username}</Text>
          <Text  style={{textAlign:'center'}}>{props.usertitle}</Text>
        </View>
      <TouchableOpacity>
        <Text style={{textAlign:'center',fontSize:17,color:'darkgreen',marginTop:15,marginBottom:5}}>תגובות</Text>
      </TouchableOpacity>
      </View>
    );
  };

  const PostCompenent = () => {
    //console.log('List of post need to renderd -->',PostList);
    let compnent = [];
    PostList.forEach((post, i) => {
      console.log("Post -->", post);
      // compnent.push(<View key={i} style={styles.cardPost}></View>);
      compnent.push(
        <SinglePost
          uri={post.photoUri}
          content={post.postContent}
          id={post.postId}
          username={post.userName}
          usertitle={post.userType}
        />
      );
    });
    return compnent;
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
        <ScrollView>
          {ForumsList != 0 ? <HeaderCompenent /> : ""}
          <View style={styles.Col}>
            {PostList != 0 ? <PostCompenent /> : <Text>Error</Text>}
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  iconBack: {
    fontSize: 50,
    fontWeight: 900,
  },
  BTN: {
    paddingHorizontal: 35,
    paddingVertical: 5,
    backgroundColor: "#9EB98B75",
    borderRadius: 12,
    borderBottomColor: "#90AE95",
    borderBottomWidth: 2,
    // position:'relative',
    // bottom:-35,
    marginTop: 15,
  },
  BTN2: {
    paddingHorizontal: 35,
    paddingVertical: 5,
    backgroundColor: "#F0989885",
    borderRadius: 12,
    borderBottomColor: "#90AE95",
    borderBottomWidth: 2,
    // position:'relative',
    // bottom:-35,
    marginTop: 15,
  },
  BTNtitle: {
    fontSize: 18,
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
    // height: 265,
    marginTop: 75,
    marginHorizontal: 5,
    borderRadius: 25,
    paddingBottom: 10,
    marginBottom: 10,
  },
  cardPost: {
    backgroundColor: "#77AC7C70",
    borderColor: "#90AE95",
    borderWidth: 2,
    width: 350,
    marginTop: 35,
    borderRadius: 25,
    paddingBottom: 15,
    marginHorizontal: 5,
    marginBottom: 10,
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
    marginHorizontal: 10,
    marginTop: 15,
  },
  content2: {
    // borderColor: "#000",
    // borderWidth: 1,
    // marginHorizontal: 10,
    // marginTop: 15,
    position:'absolute',
    width:'53%',
    left:142,
    bottom:85,
  },
  content2txt:{
    textAlign:'left',
    fontSize:16,
  },
  Greet: {
    fontSize: 12,
    textAlign: "center",
    // position:'relative',
    // top:55,
    // left:35,
    marginBottom: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 500,
    // borderColor: "#889480",
    // borderWidth:1,
    // borderBottomWidth:13,
    // padding:5,
  },
  imgView: {
    width: 125,
    height: 125,
    borderRadius: 500,
    borderColor: "#889480",
    borderWidth: 1.2,
    borderBottomWidth: 5.5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  userdetail:{
    // borderColor: "#000",
    // borderWidth: 1,
    width:'25%',
    position:'absolute',
    top:140,
    left:28,
  },
});
