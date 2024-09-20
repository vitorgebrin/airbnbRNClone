import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import { useAuth } from '@clerk/clerk-react';
import { ClerkProvider } from "@clerk/clerk-expo";
//import { useColorScheme } from '@/components/useColorScheme';

const CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const tokenCache = {
  async getToken(key:string) {
    try{
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key:string,value:string) {
    try{
      return SecureStore.setItemAsync(key,value);
    } catch (err) {
      return;
    }
  }
}
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "mon": require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
)
}

function RootLayoutNav() {
  //VITOR: added this for navigation
  const router = useRouter()
  //VITOR: added this for authentication
  const {isLoaded,isSignedIn} = useAuth();
  useEffect(()=> {
    if (isLoaded && !isSignedIn){
      router.push('/(modals)/login')
    }
  },[isLoaded])
  //VITOR:
  //here we define how each screen show be shown with the Stack.Screen JSX tag and its options
  // for the tabs we create a simple change, for the login we create a modal view (this easy!)
  // and for the booking view we use a nice animation! (right now it doesn't have bg though)
    return (
        <Stack> 
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='(modals)/login' options={{
            title:'Log in or sign up',
            headerTitleStyle: {fontFamily:'mon-sb'},
            presentation:'modal',
            headerLeft: () => (
              <TouchableOpacity onPress={() =>  router.back()}>
                <Ionicons name='close-outline' size={28}/>
              </TouchableOpacity>
            )
          }}/>
          <Stack.Screen name='listing/[id]' options={{headerTitle:''}}/>
          <Stack.Screen name='(modals)/booking' options={{
            presentation: 'transparentModal',
            animation:'fade',
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='close-outline' size={28}/>
              </TouchableOpacity>
            )
          }} />
        </Stack>
    );
  }
