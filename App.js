import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { getISchools } from './iSchoolData';
import { shuffleArray } from './Shuffle';
import Icon from 'react-native-vector-icons/FontAwesome5';

function rearrangeItems(items, moveFromIndex, moveToIndex) {
    
  const movingItem = items[moveFromIndex];
  items.splice(moveFromIndex, 1);
  items.splice(moveToIndex, 0, movingItem);

  return items;
}
// The rearrangeItems function is from https://medium.com/front-end-weekly/array-splice-interesting-and-useful-13f38a9bb6b2

class UniversityList extends React.Component {
  constructor(props) {
      super(props);
      
  }

  render() {
      return (
          <View>
              <FlatList 
              data={this.props.schoolRanking}
              renderItem={({item, index}) =>
              <SafeAreaView style={row.body}>
                  <View style={row.rankingSection}>
                      <Text style={row.number}>{index +1}</Text>
                  </View>
                  <View style={row.schoolSection}>
                      <Text numberOfLines={1} style={row.university}>{item.univ}</Text>
                      <Text numberOfLines={1}>{item.school}</Text> 
                  </View>
              </SafeAreaView>
              }
              />    
          </View>
          
      );
  }

}

const row = StyleSheet.create({
  body: {
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end',
      textAlign:'left',
      width:'100%',
      marginTop: '0.5%',
      marginBottom: '0.5%',
      },
  rankingSection: {
      flex: 0.1,
      justifyContent:'space-around', 
      width: 40,
  },
  number :{
      fontSize: 23,
      color: '#69406E',
      fontWeight: 'bold',
      justifyContent: 'center',
      alignSelf: 'center'
  },
  schoolSection: {
      flex: 0.9,
  },
  university:{
      fontSize: 17,
      color: 'blue'
  }
});


export default class classApp extends React.Component {

  
  constructor(props) {
    super(props);
    this.iSchoolData = rearrangeItems(getISchools(), 3,0);
    this.state = {
      time: "",
      schoolRanking: this.iSchoolData
    }

    
  }
  componentDidMount(){
    let currentTime = new Date().toLocaleString('en-US');
    
    this.setState ({
        time: currentTime,
    });
  }

  handleShuffle = () =>{
    let tempList = this.iSchoolData.slice(); //Clone the list from the second element
    let shuffledList = shuffleArray(tempList.slice(1));
    shuffledList.unshift(tempList[0]);
    
    this.setState({
        schoolRanking: shuffledList
    });
  }

  handleRefresh = () => {
      let currentTime = new Date().toLocaleString('en-US');
      this.handleShuffle();
      this.setState ({
          time: currentTime
      });
  }





  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={nav.container}>
                <View style={nav.section1}>
                    <Text style={nav.title}>iSchool Ranking</Text>
                    <Text style={nav.updatetime}>Updated: {this.state.time}</Text>
                </View>
                <View style={nav.section2}>
                    <Icon.Button name="redo" onPress={() => this.handleRefresh()} solid style={nav.button} backgroundColor='transparent'/>
                </View>       
        </View>  
        <UniversityList schoolRanking={this.state.schoolRanking}/>
      </SafeAreaView> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 100,
    height: '100%'
  },
  
});

const nav = StyleSheet.create({
  container: {
      flexDirection:'row',
      backgroundColor:'#384460',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'left',
      width:'100%',
      height:'15%',
  },

  section1:{
      flex:0.6,
      flexDirection: 'column',
      alignItems:'flex-start',
      justifyContent:'space-around',  
      marginLeft: 20,
  },

  section2:{
      flex: 0.4,
      alignItems:'center',
      justifyContent:'space-around',  
  },

  title: {
      color: 'white',
      fontSize: 24,
  },
  updatetime: {
      color: 'white',
      fontSize: 13,
  },

  button:{
      alignItems: 'center',
  }
});
