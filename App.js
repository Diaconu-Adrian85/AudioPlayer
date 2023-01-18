import { useState } from 'react';
import { StyleSheet, View, Text, } from "react-native"
import * as DocumentPicker from 'expo-document-picker';

import AppHeader from "./components/AppHeader"
import LoadSongButton from "./components/LoadSongButton"
import Player from "./components/Player"

export default function App() {
  const [display, setDisplay] = useState(<Text>Alege o melodie!</Text>)
  const [title, setTitle] = useState('Player Audio')

  const loadAudio = async () => {
    setTitle('Player Audio')
    setDisplay(<Text>Nici o melodie selectata!</Text>)
    const audio = await DocumentPicker.getDocumentAsync({ type: 'audio/*' })
    if ( audio.type === 'success' ) {
      setTitle(audio.name)
      setDisplay(<Player
        uri={audio.uri}
        name={audio.name}/>
      )
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader title={title}/>
      <View style={styles.musicBlock}>
        { display }
      </View>
      <LoadSongButton
        onPress={loadAudio}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicBlock: {
    position: 'relative',
    justifyContent: 'center', 
    alignItems: 'center', 
    flex:1
  }
})