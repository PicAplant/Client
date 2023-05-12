//new
import React, { useEffect, useState } from "react";
//import Unorderedlist from 'react-native-unordered-list';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  ScrollView, 
  TouchableOpacity,
  Pressable
} from "react-native";
import NavBar from "../functional componet/navBar";
import BackGroundImageLocal from "../assets/bg_userProfile.png";
import styles from "../App.module.js";
import Searching from "./Searching";
export default function SearchResults({ navigation,route }) {
    const { plant,userID,isExpert,plants } =route.params;
    const [moreInfo,setMoreInfo]=useState(false);
    const navigateToSearchResults=(item)=>{
        navigation.navigate("SearchResults", {
          plant: item,
          userID: userID,
          isExpert: isExpert,
          plants:plants
        })
      }
      const toggleSwitch = () => {
        setMoreInfo((previousState) => !previousState);
        console.log(moreInfo)
      };

      const similarPlantsArray = plants.map((item) =>{
        let counter=0;
        if(item.plantName!==null&&item.plantScientificName!==plant.plantScientificName){
      item.plantFamily==plant.plantFamily?counter+=1:""
      item.plantNumOfPetals==plant.plantNumOfPetals?counter+=1:""
      item.plantLeafShape==plant.plantLeafShape?counter+=1:"";
      item.plantLeafMargin==plant.plantLeafMargin?counter+=1:"";
      item.plantHabitat==plant.plantHabitat?counter+=1:"";
      item.plantStemShape==plant.plantStemShape?counter+=1:""
      item.plantLifeForm==plant.plantLifeForm?counter+=1:""
      item.PlantMedic==plant.PlantMedic?counter+=1:""
      item.plantIsToxic==plant.plantIsToxic?counter+=1:""
      item.plantIsEatable==plant.plantIsEatable?counter+=1:""
      item.plantIsAllergenic==plant.plantIsAllergenic?counter+=1:""
      item.plantIsEndangered==plant.plantIsEndangered?counter+=1:""
      item.plantIsProtected==plant.plantIsProtected?counter+=1:""
      item.plantIsProvidedHoneydew==plant.plantIsProvidedHoneydew?counter+=1:""
        }
return(
<View>
{counter>=10?     
<Pressable style={{alignItems:"center",justifyContent:"center",padding:5,width:160}} onPress={()=>{navigateToSearchResults(item)}}>

  {item.plantImage===null?"":<Image source={{uri: item.plantImage}}
 style={{width:140,aspectRatio:1}} />}
   <Text>{item.plantName}</Text>
  <Text>{item.plantScientificName}</Text>
 </Pressable>:""}

        
        </View>
      )})
      return (
        <TouchableWithoutFeedback style={styles.container}>
          <ImageBackground style={styles.backgroundImage} source={BackGroundImageLocal}>
        <SafeAreaView style={{flex: 1,alignItems:"center"}}>
   
   <Searching plants={plants} navigateToSearchResults={navigateToSearchResults}
       />
       <ScrollView contentContainerStyle={{alignItems:"center",paddingBottom:15}}>
         {plant.plantImage===null?"":<Image source={{uri: plant.plantImage}}
          style={{width: "90%",
      aspectRatio: 1,
      borderRadius: 20
  }} />}
  <View style={styles.plantInfo}>
  <Text style={{fontSize:28,textAlign:"right",textDecorationLine:"underline"
}}>מידע כללי:</Text>
  <Text> • שם הצמח: {plant.plantName}</Text>
  <Text> • שם מדעי: {plant.plantScientificName}</Text>
  {plant.plantIsToxic?<Text style={{fontSize:22,color:"#F00"}}> • צמח רעיל!</Text>:""}

  <Text> • משפחה: {plant.plantFamily}</Text>
  <Text> • מס׳ עלי כותרת: {plant.plantNumOfPetals}</Text>
  <Text> • צורת העלה: {plant.plantLeafShape}</Text>
  <Text> • צורת שפת העלה: {plant.plantLeafMargin}</Text>
  <Text> • אזור גידול: {plant.plantHabitat}</Text>
  <Text> • צורת הגבעול: {plant.plantStemShape}</Text>
  <Text> • צורת חיים: {plant.plantLifeForm}</Text>
  <Text> • תקופת גידול: {plant.plantBloomingSeason}</Text>
{plant.PlantMedic?<Text> • משמש לרפואה</Text>:""}
{plant.plantIsEatable?<Text> • צמח אכיל</Text>:""}
{plant.plantIsAllergenic?<Text> • צמח אלרגני</Text>:""}
{plant.plantIsEndangered?<Text> • צמח זה נמצא תחת סכנת הכחדה</Text>:""}
{plant.plantIsProtected?<Text> • צמח מוגן</Text>:""}
{plant.plantIsProvidedHoneydew?<Text> • מצמח זה ניתן להנפיק דבש</Text>:""}
<TouchableOpacity title="more info" onPress={toggleSwitch}>
{moreInfo?
<Text style={{textDecorationLine:"underline"}}> • הצג פחות</Text>
:<Text style={{textDecorationLine:"underline"}}> • מידע נוסף</Text>

}
</TouchableOpacity>
{moreInfo&&<Text style={{writingDirection: 'rtl',maxWidth:"99%"}}> • מידע נוסף: {plant.plantMoreInfo}</Text>}
  </View>
  <View><Text style={{textAlign:"center",fontSize:24}}>צמחים בעלי מאפיינים דומים</Text>
  <ScrollView horizontal>
  <View style={{
          flexDirection: "row",
          justifyContent:"flex-start",
          height:200
          }}>
        {similarPlantsArray}
</View>
  </ScrollView>
  </View>
  </ScrollView>
      <NavBar
        isExpert={route.params.isExpert}
        userID={route.params.userID}
      ></NavBar>
   
         </SafeAreaView>
         </ImageBackground>
         </TouchableWithoutFeedback>
     );
};










  

