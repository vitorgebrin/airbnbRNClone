import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'

/* This is a code for warming up the browser on android. This is not 100% needed
but it will speed up the operation on android. 
 */
export const useWarmWebBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    },[])
} 