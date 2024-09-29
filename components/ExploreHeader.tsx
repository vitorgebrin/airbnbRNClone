import { View, Text,StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import * as Haptics from 'expo-haptics' // This is a very useful package for Haptic Feedback!

const categories = [
    {
      name: 'Tiny homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];
  
  interface Props {
    onCategoryChanged: (category: string) => void;
  }

export default function ExploreHeader({onCategoryChanged}:Props) {
    const scrollRef = useRef<ScrollView>(null)
    const itemRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIndex,setActiveIndex] = useState(0)

    const selectCategory = (index:number) => {
        const selected = itemRef.current[index]
        setActiveIndex(index)
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({x:x,y:0,animated:true})
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onCategoryChanged(categories[index].name)
    }
  return (
    <SafeAreaView style={{flex:1}}>

        <View style={styles.container}>
            <View style={styles.actionRow}>
                <Link href={'/(modals)/booking'} asChild>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name='search' size={24}/>
                        <View>
                            <Text style={{fontFamily:"mon-sb"}}>Where to?</Text>
                            <Text style={{fontFamily:"mon"}}>Anywhere . Any week</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name='options-outline' size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView 
            horizontal
            ref={scrollRef}
            contentContainerStyle={{
                alignItems:"center",
                gap:30,
                paddingHorizontal:16
            }}
            >
                {categories.map((item,index) => (
                    <TouchableOpacity onPress={() => selectCategory(index)} 
                    ref={(el) => itemRef.current[index] = el} 
                    key={index} 
                    style={activeIndex === index ? styles.categoryBtnActive :styles.categoryBtn}>
                        <MaterialIcons size={24} name={item.icon as any}
                        color={activeIndex === index ? "#000" :Colors.grey}
                        ></MaterialIcons>
                        <Text
                        style={activeIndex === index ? styles.categoryTextActive :styles.categoryText}
                        >{item.name}</Text>
                    </TouchableOpacity>
                ) )}
            </ScrollView>
        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#fff",
        height:160
    },
    actionRow: {
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:24,
        paddingBottom:16,
        gap:10
    },
    filterBtn:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.grey,
        borderRadius:24
    },
    searchBtn:{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        borderColor:"#c2c2c2",
        borderWidth:StyleSheet.hairlineWidth,
        flex:1,
        padding:16,
        borderRadius:30,
        backgroundColor:"#fff",

        elevation:2,
        shadowColor:"#000",
        shadowOpacity:0.12,
        shadowRadius:8,
        shadowOffset:{width:1,height:1 }
    },
    categoryText:{
        fontFamily:'mon-sb',
        fontSize:14,
        color: Colors.grey


    },
    categoryTextActive:{
        fontFamily:'mon-sb',
        fontSize:14,
        color: "#000"
    },
    categoryBtn:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:8
    },
    categoryBtnActive:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        borderBottomColor:"#000",
        borderBottomWidth:2,
        paddingBottom:8
    }
})