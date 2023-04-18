import React, { createContext, useState, useEffect } from "react";
import styles from "../App.module.js";
import { Picker } from "@react-native-picker/picker";
import * as WebBrowser from "expo-web-browser";
import * as Notifications from "expo-notifications";
import * as Google from "expo-auth-session/providers/google";
import {
  KeyboardAvoidingView,
  ImageBackground,
  CheckBox,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import UserProfile from "./UserProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function Register({ navigation }) {
  const BackGroundImageLocal = require("../assets/background_signup.png");
  const appIcon = require("../assets/icon_title.png");

  apiUrl = "https://proj.ruppin.ac.il/cgroup41/prod/Registrations";

  const [isSelected, setSelection] = useState(false);

  const [accessToken, setAccessToken] = useState(null);

  const [user, setUser] = useState(null);
  const [emailCount, setEmailCount] = useState(false);
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [comunity, setComunity] = useState("");
  const [checkValdEmail, setCheckValdEmail] = useState(true);
  const [CheckValdPassword, setCheckValdPassword] = useState(false);
  const [token, setToken] = useState("");

  const [request, response, promtAsync] = Google.useAuthRequest({
    clientId:
      "222431351949-u9t6ooea1k530kli2d6tiqbk6cndm78n.apps.googleusercontent.com",
    iosClientId:
      "222431351949-bf16s29kjk5uhqaamuf76bhln3o9ulq1.apps.googleusercontent.com",
    androidClientId:
      "222431351949-h1ulm3jsa1t5cmghgghtppfip4j67p6t.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function save(userToStore) {
    try {
      await AsyncStorage.setItem("user", userToStore);
      await AsyncStorage.setItem("isLoged", "1");
      console.log("51 ", userToStore);
    } catch (error) {
      console.log(error);
    }
  }

  //permissions for push
  useEffect(() => {
    configurePushNotification();
  }, []);

  async function configurePushNotification() {
    const { status } = await Notifications.getPermissionsAsync();
    let finalStatus = status;

    if (finalStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission required",
        "Push notification need the appropriate permissions"
      );
      return;
    }

    const pushTokenData = await Notifications.getExpoPushTokenAsync().then(
      (pushTokenData) => {
        console.log("PUSH TOKEN", pushTokenData);
        setToken(pushTokenData.data);
        console.log("PUSH TOKEN", token);
      }
    );
    //pushTokenData holds the token of user for expo push

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userinfo = await response.json();
    setUser(userinfo);

    // console.log('55 ',user);
  }

  async function RegisterAndLogin() {
    let s;
    let GetUser = "";

    if (user == null) {
      let re = /\S+@\S+\.\S+/;
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

      console.log(password, " ", email, " ", fullname, " ", comunity);
      s = {
        UserName: fullname,
        UserPassword: password,
        UserEmail: email,
        UserType: comunity,
        UserToken: token,
      };
      console.log("81 ", s);

      if (comunity == "") {
        Alert.alert("יש לבחור קהילה");
        return;
      }
      if (fullname == "" || password == "" || email == "") {
        Alert.alert("יש לבדוק תקינות הכנסת נתונים");
        return;
      }

      if (re.test(email) || regex.test(email)) {
        setCheckValdEmail(false);
      } else {
        setCheckValdEmail(true);
        setEmailCount(true);
        return;
      }

      if (password.length < 5) {
        setCheckValdPassword(true);
        return;
      } else {
        setCheckValdPassword(false);
      }
    } else {
      if (comunity == "") {
        Alert.alert("יש לבחור קהילה");
        console.log("103 ", user);
        return;
      }

      s = {
        UserName: user.name,
        UserPassword: user.email,
        UserEmail: user.email,
        UserType: comunity,
        UserToken: token,
      };
    }
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(s),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8", //very important to add the 'charset=UTF-8'!!!!
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((response) => {
        console.log("res=", JSON.stringify(response));
        return response.json();
      })
      .then(
        (result) => {
          GetUser = JSON.stringify(result);
          if (GetUser != "") {
            console.log("140 ", GetUser);
            {
              save(GetUser);
            }
            console.log("fetch POST= ", JSON.stringify(result));
            navigation.dispatch(StackActions.replace("Identify", GetUser));
          }
        },
        (error) => {
          console.log("err post=", error);
        }
      );

    const response = await fetch(apiUrl);
    const json = await response.json();
  }

  const ShowUserInfo = () => {
    if (user) {
      let fullname = `${user.given_name} ${user.family_name}`;
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "Bold" }}>{fullname}</Text>
          <Text style={{ fontSize: 20, fontWeight: "Bold" }}>{user.email}</Text>
        </View>
      );
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(true);
  console.log(isSelected);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={BackGroundImageLocal}
          style={styles.backgroundImage}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons
              style={styles.iconBack}
              name="return-up-back-outline"
              color="#77a068"
            ></Ionicons>
          </TouchableOpacity>
          <Image style={styles.tinyLogo} source={appIcon} />
          <View style={styles.containerReg}>
            <Text style={{ fontWeight: "bold" }}>שם מלא</Text>
            <TextInput
              style={styles.Textinput}
              onChangeText={(fullText) => setFullname(fullText)}
            />
            <Text style={{ fontWeight: "bold" }}>דואר אלקטרוני</Text>
            <TextInput
              style={styles.Textinput}
              value={email}
              onChangeText={(emailText) => setEmail(emailText)}
            />
            {checkValdEmail && emailCount ? (
              <Text style={{ left: 25, color: "red" }}>פורמט אימייל שגוי</Text>
            ) : (
              ""
            )}
            <Text style={{ fontWeight: "bold" }}>סיסמה</Text>
            <View>
              <TextInput
                label="Password"
                style={[styles.Textinput, styles.TextinputLeft]}
                secureTextEntry={passwordVisible}
                onChangeText={(passText) => setPassword(passText)}
              />
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                style={{
                  position: "absolute",
                  top: 4,
                  left: 30,
                  fontSize: 30,
                  textAlign: "left",
                }}
                onPress={() => setPasswordVisible(!passwordVisible)}
              ></Ionicons>
              {CheckValdPassword ? (
                <Text style={{ left: 25, color: "red" }}>
                  סיסמה שגויה,על סיסמה להיות גדול מ5 תוים
                </Text>
              ) : (
                ""
              )}

              <Text style={{ textAlign:'center', fontWeight: "bold" }}>בחר קהילה</Text>
              <View style={styles.list}>
                <Picker
                  style={styles.pickerItem}
                  selectedValue={comunity}
                  onValueChange={(comunityText) => setComunity(comunityText)}
                >
                  <Picker.Item label="בחר קהילה" value="" />
                  <Picker.Item label="לקט" value="לקט" />
                  <Picker.Item label="מדריך טיולים" value="מדריך טיולים" />
                  <Picker.Item label="מגדל" value="מגדל" />
                  <Picker.Item label="חובב טבע" value="חובב טבע" />
                </Picker>
              </View>

              {/* <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
        />
        <Text style={styles.label}>קראתי ואני מסכים לתנאי השימוש</Text>
      </View> */}
            </View>
            {/* go to user profile for now and after go to home page (what guy do) */}
            <TouchableOpacity
              style={styles.btnStyleLogin}
              onPress={RegisterAndLogin}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  top: 4,
                  textAlign: "center",
                }}
              >
                הירשם
              </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", marginVertical: 6 }}>או</Text>
            <TouchableOpacity
              style={styles.btnStyleLogin}
              disabled={!request}
              onPress={() => {
                promtAsync();
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  top: 4,
                  textAlign: "center",
                }}
              >
                הירשם באמצעות גוגל
              </Text>
            </TouchableOpacity>
            {user && <ShowUserInfo />}
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
}
