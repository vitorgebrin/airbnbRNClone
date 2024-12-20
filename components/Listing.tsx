import { View, Text, FlatList,ListRenderItem,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

interface Props {
    listings: any[],
    category:string,
    refresh:number
}

type Listing = {
  id:number,
  medium_url:string,
  name:string,
  review_scores_rating:number,
  room_type:string,
  price:number,
  xl_picture_url:string
}

const Listing = ({listings:items,category,refresh}:Props) => {
  const [loading,setLoading] = useState(false)
  const listRef = useRef<FlatList>(null)


  useEffect(()=>{
    if (refresh) {
      listRef.current?.scrollToOffset({offset:0,animated:true})
    }
    },[refresh])


    useEffect(() => {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
      },200)
    },[category])

// this is declared separatedly to make understanding easier
// the asChild in Link is needed for Expo Rendering of link
const renderRow: ListRenderItem<Listing> = ({item}) => (
  <Link href={`/listing/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft} >
        <Image source={{uri:item.medium_url}} style={styles.image}/>
        <TouchableOpacity style={{position:'absolute',right:30,top:30}}>
          <Ionicons name='heart-outline' size={24} color='#000'/>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontFamily:'mon-sb',fontSize:16}}>{item.name}</Text>
          <View style={{flexDirection:'row', gap:4}}>
            <Ionicons name='star' size={16}/>
            <Text style={{fontFamily:'mon-sb'}}>{item.review_scores_rating/20}</Text>
          </View>
        </View>
            <Text style={{fontFamily:'mon'}}>{item.room_type}</Text>
            <View style={{flexDirection:'row',gap:4}}>
              <Text style={{fontFamily:'mon-sb'}}>€ {item.price}</Text>
              <Text style={{fontFamily:'mon'}}>night</Text>
            </View>
      </Animated.View>
    </TouchableOpacity>
  </Link>
)
  return (
    <View style={defaultStyles.container}>
      <FlatList
      ref={listRef}
      data={loading ? [] : items}
      renderItem={renderRow}
      ListHeaderComponent={<Text style={{textAlign:'center',fontFamily:'mon-sb',fontSize:16,marginTop:4}}>{items.length} homes</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding:16,
    gap:10,
    marginVertical:16
  },
  image:{
    width:'100%',
    height:300
  }
})

export default Listing