import "react-native-gesture-handler"
import { useEffect } from "react"
import { StatusBar } from "react-native"
import { ThemeProvider } from "styled-components/native"

import { RoutersApp } from "./routes/app.routers"


import firebase from "@react-native-firebase/app"
import { firebaseConfig } from "./services/fireBaseConfig"
import "@react-native-firebase/firestore";
import theme from "./global/styles/theme"

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
