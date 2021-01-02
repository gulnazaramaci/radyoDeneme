import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet,Image,ActivityIndicator,SafeAreaView} from 'react-native';
import SoundPlayer from 'react-native-sound-player'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baslat:'false',
    };

  }

 

  playSong() {
    try {
      SoundPlayer.playUrl('https://17703.live.streamtheworld.com/JOY_TURK2.mp3')
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
      baslat:'true'
    })
  }

  onPressDurdur() {
    SoundPlayer.stop()
    this.getInfo()
    this.setState({ baslat: 'false'}, function() {
      // do something with new state
  });
    console.log(this.state.baslat)
  }

  _onFinishedPlayingSubscription = null
  _onFinishedLoadingSubscription = null
  _onFinishedLoadingFileSubscription = null
  _onFinishedLoadingURLSubscription = null

  componentDidMount() {
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      console.log('finished playing', success)
    })
    _onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', ({ success }) => {
      console.log('finished loading', success)
    })
    _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener('FinishedLoadingFile', ({ success, name, type }) => {
      console.log('finished loading file', success, name, type)
    })
    _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', ({ success, url }) => {
      console.log('finished loading url', success, url)
    })
  }
 
  // Remove all the subscriptions when component will unmount
  componentWillUnmount() {
    _onFinishedPlayingSubscription.remove()
    _onFinishedLoadingSubscription.remove()
    _onFinishedLoadingURLSubscription.remove()
    _onFinishedLoadingFileSubscription.remove()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {
            this.state.baslat == 'true' ?
            (<Image source={require("./unnamed.gif")} style={styles.logo} />  ):
            (<Image source={require("./sesyok.png")} style={styles.logo} />)
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
       
      </SafeAreaView>
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