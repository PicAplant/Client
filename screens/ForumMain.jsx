import { View, Text, ImageBackground } from "react-native";
import React,{useEffect,useState} from "react";
import bg from "../assets/ForumsBG.png";
import NavBar from "../functional componet/navBar";

export default function ForumMain({ navigation, route }) {
    console.log('Forum Main Route --->',route.params)

    useEffect(() => {
      console.log('onload in Forum Main');
      fetch(api, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
        .then((response) => {
          //console.log("response= ", JSON.stringify(response));
          return response.json();
        })
        .then(
          (result) => {
            //console.log("fetch POST= ", JSON.stringify(result));
            setPath(JSON.stringify(result).split("/").pop());
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    
      return () => {
        second
      }
    }, [])
    


  return <>
  <ImageBackground style={{width:'100%',height:'100%'}} source={bg}>

    </ImageBackground>
    <NavBar isExpert={route.params.isExpert} userID={route.params.userID}></NavBar>
    </>;
}
