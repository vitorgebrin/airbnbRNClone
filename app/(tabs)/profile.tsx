import { View,Text,Button,StyleSheet,Image,TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker'

const Profile = () => {
const {signOut, isSignedIn} = useAuth();
const {user} = useUser();
const [firstName, setFirstName] = useState(user?.firstName)
const [lastName, setLastName] = useState(user?.lastName)
const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
const [edit, setEdit] = useState(false)

useEffect(()=>{
  if(!user) return;
  setFirstName(user.firstName);
  setLastName(user.lastName);
  setEmail(user.emailAddresses[0].emailAddress);

},[user])

/*Saving the user on clerk (updating) */
const onSaveUser = async() =>  {
try {
  if (!firstName || !lastName) return;
  await user?.update({firstName,lastName});
} catch (error) {
  console.error(error)
} finally {
  setEdit(false)
}
}

/*Using expo-image-picker to pick a picture from the phone */
const onCaptureImage = async() => {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing:true,
    quality:0.75,
    base64:true
  })
  if (!result.canceled) {
    const base64 = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
    await user?.setProfileImage({
      file: base64,
    })
  }
}

  return(
<SafeAreaView style={defaultStyles.container}>
  <View style={styles.headerContainer}>
    <Text style={styles.header}>Profile</Text>
    <Ionicons name='notifications-outline' size={26}/>
  </View>

  {user && (<View style={styles.card}>
    <TouchableOpacity onPress={()=>onCaptureImage()}>
      <Image source={{uri:user?.imageUrl}} style={styles.avatar}/>
    </TouchableOpacity>
    <View style={{flexDirection:'row',gap:6}}>
      {edit ? (
        <View style={styles.editRow}>
          <TextInput placeholder="First name" 
          value={firstName || ''}
          onChangeText={setFirstName}
          style={[defaultStyles.inputField,{width:100}]}
          />
          <TextInput placeholder="Last name" 
          value={lastName || ''}
          onChangeText={setLastName}
          style={[defaultStyles.inputField,{width:100}]}
          />
          <TouchableOpacity onPress={onSaveUser}>
            <Ionicons name='checkmark-outline' size={24} color={Colors.dark}/>
          </TouchableOpacity>
        </View>
      ) : 
      (<View style={styles.editRow}>
        <Text style={{fontFamily:'mon-sb',fontSize:22}}>
          {firstName} {lastName}
        </Text>
        <TouchableOpacity onPress={() => setEdit(true)}>
          <Ionicons name='create-outline' size={24} color={Colors.dark}/>
        </TouchableOpacity>
      </View>)}
    </View>
      <Text>{email}</Text>
      <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
  </View>)}

  {isSignedIn && <Button title="Log out" onPress={()=>signOut()} color={Colors.dark}/>}
  { !isSignedIn && (
  <Link href={'/(modals)/login'}>
    <Button title="Log in" color={Colors.dark}/>
  </Link>)
  } 
  
</SafeAreaView>
  );
};
const styles = StyleSheet.create({
headerContainer:{
  flexDirection:'row',
  padding:24,
  alignItems:'center',
  justifyContent:'space-between'
},
header:{
  fontFamily:'mon-sb',
  fontSize:24
},
card: {
  backgroundColor: '#fff',
  padding: 24,
  borderRadius: 16,
  marginHorizontal: 24,
  marginTop: 24,
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: {
    width: 1,
    height: 2,
  },
  alignItems: 'center',
  gap: 14,
  marginBottom: 24,
},
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: Colors.grey,
},
editRow: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
},
})
export default Profile