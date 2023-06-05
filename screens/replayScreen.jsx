import { View, Text } from 'react-native'
import React, { useEffect, useState } from "react";
export default function replayScreen({ navigation, route }) {
    useEffect(() => {
      console.log('In relay screen Route--> ',route.params )
    
  
    }, [])
    
  return (
    <View>
      <Text>replayScreen</Text>
    </View>
  )
}