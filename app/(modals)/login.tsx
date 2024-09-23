import { View,Text,StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from 'react'
import { useWarmWebBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google="oauth_google",
  Apple="oauth_apple",
  Facebook="oauth_facebook"
}

const Page = () => {
  useWarmWebBrowser()
  const router = useRouter()
  const {startOAuthFlow: appleAuth} = useOAuth({strategy:"oauth_apple"})
  const {startOAuthFlow :googleAuth} = useOAuth({strategy:"oauth_google"})
  const {startOAuthFlow: facebookAuth} = useOAuth({strategy:"oauth_facebook"})

  const onSelectAuth = async (strategy:Strategy) => {
    const selectedAuth = {
      [Strategy.Google]:googleAuth,
      [Strategy.Apple]:appleAuth,
      [Strategy.Facebook]:facebookAuth
    }[strategy]

    try{
      const {createdSessionId, setActive} = await selectedAuth()
      
      if (createdSessionId) {
        setActive!({session:createdSessionId})
        router.back()
      }
    } catch (error) {
      console.log('Error found: ${error}')
    }
  }
  return(
    <View style={style.container}>
      <TextInput autoCapitalize="none" placeholder="Email" style={defaultStyles.inputField} />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={style.separatorView}>
        <View style= {{ flex:1,borderBottomColor:"#000",borderBottomWidth:StyleSheet.hairlineWidth}}/>
        <Text style = {style.separator}>or</Text>
        <View style= {{ flex:1,borderBottomColor:"#000",borderBottomWidth:StyleSheet.hairlineWidth}}/>
      </View>
      <View style={{gap:20}}>
        <TouchableOpacity style={style.btnOutline}>
          <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon}/>
          <Text style={style.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon}/>
          <Text style={style.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon}/>
          <Text style={style.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon}/>
          <Text style={style.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    padding:26,
    gap:40
  },
  separatorView:{
    flexDirection:"row",
    gap:20,
    alignItems:"center",
    marginVertical:10
  },
  separator:{
    fontFamily:"mon-sb",
    color: Colors.grey,
  },
  btnOutline:{
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:Colors.grey,
    height:50,
    borderRadius:8,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    paddingHorizontal:10
  },
  btnOutlineText:{
    color:"#000",
    fontFamily:"mon-sb",
    fontSize:16
  }
})
export default Page