import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image,ActivityIndicator} from 'react-native';
import SoundPlayer from 'react-native-sound-player'
export default class App extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    baslat:false,
  };

  playSong() {
    try {
      SoundPlayer.playUrl('http://centauri.shoutca.st:9039/;stream.mp3')
    } catch (e) {
      alert('Cannot play the file')
      console.log('cannot play the song file', e)
    }
  }

  async getInfo() { // You need the keyword `async`
    try {
      const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
      console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
    } catch (e) {
      console.log('There is no song playing', e)
    }
  }

  onPressPlayButton() {
    this.playSong()
    this.getInfo()
    this.setState({
      baslat:true
    })
  }

  onPressDurdur() {
    SoundPlayer.stop()
    this.getInfo()
    this.setState({
      baslat:false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.baslat == true ?
            (<Image source={require("./unnamed.gif")} style={styles.logo} resizeMode={"contain"} />  ):
            (<Image source={require("./sesyok.png")} style={styles.logo} resizeMode={"contain"} />)
          }
           
        </View>
       <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => this.onPressPlayButton()} style={styles.button}>
              <Text style={{color:"#fff"}}> Başlat </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressDurdur()} style={styles.button}>
              <Text style={{color:"#fff"}}> Durdur </Text>
            </TouchableOpacity>
       </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  button:{
    backgroundColor:"#5d78ff",
    margin:10,
    padding:15,
    borderRadius:4
  }
})