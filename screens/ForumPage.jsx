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

export default function ForumPage({ navigation, route }) {
  useEffect(() => {
    console.log("onload in ForumPage this is the Route", route.params);
    console.log("Forum detail: --->\n", route.params.forum);
  }, []);
  return (
    <>
      <ImageBackground
        style={{ width: "100%", height: "100%", zIndex: -1 }}
        source={bg}
      ></ImageBackground>
    </>
  );
}
