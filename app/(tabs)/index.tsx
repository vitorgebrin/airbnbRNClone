import { View,Text } from "react-native";
import React, { useState,useMemo } from 'react'
import {Link, Stack} from 'expo-router'
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";
import listingData from "assets/data/airbnb-listings.json"
import ListingsMap from "@/components/ListingsMap";
import listingDataGeo from "assets/data/airbnb-listings.geo.json"
import ListingBottomSheet from "@/components/ListingBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes")
  const items = useMemo(() => listingData as any, [])

  const onDataChanged = (category:string) => {
    setCategory(category)
  }
  return(
    <GestureHandlerRootView style={{flex:1}}> 
    {/*Had to add this GestureHandler due to updates*/}
    {/*Vitor, see https://github.com/gorhom/react-native-bottom-sheet/issues/1389*/}

<View style={{flex:1, marginTop:80}}>
  <Stack.Screen options={{
    header:() => <ExploreHeader onCategoryChanged={onDataChanged}/>
  }}
  />
  <ListingsMap listings = {listingDataGeo}/>
  <ListingBottomSheet listings={items} category={category}/>
</View>
  </GestureHandlerRootView>
  );
};

export default Page
