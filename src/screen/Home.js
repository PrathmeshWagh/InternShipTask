import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5  } from '@expo/vector-icons';

const Home = () => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);


  useEffect(() => {
    getUserList()
  },[])

  const getUserList = async() =>{
   
    try {
      setLoading(true)
      const data = await AsyncStorage.getItem('UserData');
      if (data) {
        const parsedData = JSON.parse(data);
        const start = (page - 1) * 8;
        const end = start + 8;
        
        setUser([...user, ...parsedData.slice(start, end)]);
        setPage(page + 1);
        setLoading(false)
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
    
  }

  const renderUserList = ({item}) =>{
    return (
        <View style={styles.userContainer}>
        <View style={{marginRight:20}}>
          <FontAwesome5 name="user-alt" size={30} color='gray' />
        </View>
        <View>
          <Text style={[styles.userDataText,{fontWeight:'500',}]}>{item.name}</Text>
          <Text style={styles.userDataText}>{item.email}</Text>
          <Text style={styles.userDataText}>{item.password}</Text>
        </View>
      </View>
    )
  }

  const handleLoadMoreData = () =>{
    if(!loading){
      getUserList()
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal:20, marginTop:10, marginBottom:50}}>
        {/* Title */}
  
      <Text style={{fontSize:20, fontWeight:'700', marginBottom:20}}>Select Profile</Text>
    
      {/* List Of SignUp User */}

      <FlatList 
      data={user}
      keyExtractor={(item,index) => index.toString()}
      renderItem={renderUserList}
      onEndReached={handleLoadMoreData}
      onEndReachedThreshold={0.5}
      />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#e8e8e8',
  },
  userContainer:{
    marginVertical:10.,
    borderRadius:3,
    backgroundColor:'#ffffff',
    paddingHorizontal:20,
    marginBottom: 10,
    flexDirection:'row',
    alignItems:'center',
    elevation:5
    

  },
  userDataText:{
    fontSize:15,
    paddingVertical:2
  }
});
