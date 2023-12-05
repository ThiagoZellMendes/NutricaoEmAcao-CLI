import "react-native-gesture-handler"
import { useEffect } from "react"
import { StatusBar } from "react-native"
import { ThemeProvider } from "styled-components/native"
import theme from "./src/global/styles/theme"
import { RoutersApp } from "./src/routes/app.routers"


import firebase from "@react-native-firebase/app"
import { firebaseConfig } from "./src/services/fireBaseConfig"
import "@react-native-firebase/firestore";

export default function App() {
 
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      <RoutersApp />
   
    </ThemeProvider>
  )
}
