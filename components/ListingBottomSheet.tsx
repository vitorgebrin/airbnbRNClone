import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Listing from './Listing'
import BottomSheet, { TouchableOpacity } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings:Listing[];
    category:string,
}

const ListingBottomSheet = ({listings,category}:Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['10%','90%'],[])/* Had to change the values to better suit the screen*/
    const [refresh,setRefresh] = useState(0)


    const showMap = () =>{
        bottomSheetRef.current?.collapse()
        setRefresh(refresh+1)
    }
  return (
    <BottomSheet 
    ref={bottomSheetRef} 
    snapPoints={snapPoints}
    handleIndicatorStyle={{backgroundColor:Colors.grey}}
    enablePanDownToClose={false}
    index={1}
    style={styles.sheetContainer}>
        <View style={{flex:1}}>
            <Listing listings={listings} category={category} refresh={refresh}/>
            <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={styles.btn} >
                    <Text style={{fontFamily:'mon-sb',color:'#fff'}}>Map</Text>
                    <Ionicons name='map' size={20} color={'#fff'}/>
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
    
  )
}
const styles = StyleSheet.create({
    absoluteBtn:{
        position:'absolute',
        bottom:30,
        width:'100%',
        alignItems:'center'
    },
    btn:{
        backgroundColor:Colors.dark,
        padding:16,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:30,
        gap:8
    },
    sheetContainer:{
        backgroundColor:'#fff',
        elevation:4,
        shadowColor:'#000',
        shadowOpacity:0.3,
        shadowRadius:4,
        shadowOffset:{width:1,height:1}
    }
})


export default ListingBottomSheet