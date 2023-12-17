import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CountryPicker } from "react-native-country-codes-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({navigation}) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [selected, setSelected] = useState("Email");
  const [hidePass, sethidePass] = useState(true);
  const [countryCode, setCountryCode] = useState("+91");
  const [countryFlag, setCountryFlag] = useState('IN');
  const [show, setShow] = useState(false);
  

  const SignUpHandler =async() =>{
    try {
      if(!name || !email || !password || (selected === 'PhoneNumber' && !mobile)){
        alert('Fill All Fields');
        return;
      }
      const formData = {
        name,
        email,
        password,
        phoneNumber: selected === "PhoneNumber" ? countryFlag + countryCode + mobile : "",
      };

      const existingData = await AsyncStorage.getItem('UserData');
      let newData = [];
      
      if (existingData) {
        // Parse existing data
        newData = JSON.parse(existingData);
      }
  
      if (!Array.isArray(newData)) {
        
        newData = [newData];
      }
      newData.push(formData);
  
      
      await AsyncStorage.setItem('UserData', JSON.stringify(newData));
      setName('')
      setEmail('')
      setPassword('')

    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems:'center', justifyContent:'center', marginBottom:50}}>
        <Text style={{fontSize:35, fontWeight:'500'}}>SignUp Page</Text>
      </View>
      {/* Email And Phone Nmber Btn */}
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btnBox,
            { backgroundColor: selected == "Email" ? "#3c859b" : null },
          ]}
          onPress={() => setSelected("Email")}
        >
          <Text
            style={{
              fontWeight: "500",
              color: selected == "Email" ? "white" : "black",
            }}
          >
            Email
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.btnBox,
            { backgroundColor: selected == "PhoneNumber" ? "#3c859b" : null },
          ]}
          onPress={() => setSelected("PhoneNumber")}
        >
          <Text
            style={{
              fontWeight: "500",
              color: selected == "PhoneNumber" ? "white" : "black",
            }}
          >
            Phone Number
          </Text>
        </Pressable>
      </View>

      {/* Input Box */}
      {selected == "Email" ? (
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <View style={[styles.txtInputBox, { marginBottom: 30 }]}>
            <TextInput
              placeholder="Enter Your Name"
              value={name}
              onChangeText={(item) => setName(item)}
            />
          </View>
          <View style={[styles.txtInputBox, { marginBottom: 30 }]}>
            <TextInput
              placeholder="Enter Your Email"
              value={email}
              onChangeText={(item) => setEmail(item)}
            />
          </View>
          <View
            style={[
              styles.txtInputBox,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <TextInput
              placeholder="Enter your Password"
              value={password}
              onChangeText={(item) => setPassword(item)}
              secureTextEntry={hidePass ? true : false}
              
            />
            {hidePass ? (
              <Pressable onPress={() => sethidePass(false)}>
                <Ionicons name="md-eye-off" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => sethidePass(true)}>
                <Ionicons name="eye" size={24} color="black" />
              </Pressable>
            )}
          </View>
        </View>
      ) : (
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <View style={{ flexDirection: "row-reverse", marginBottom: 30 }}>
            <TextInput
              placeholder="Enter You Phone Number"
              keyboardType="decimal-pad"
              value={mobile}
              onChangeText={(item) => setMobile(item)}
              style={{
                borderWidth: 0.4,
                width: "56%",
                paddingVertical: 8,
                paddingLeft: 10,
              }}
            />
            <Pressable
              style={[
                styles.txtInputBox,
                {
                  flexDirection: "row",
                  width: "22%",
                  borderWidth: 0.4,
                  paddingVertical: 8,
                  marginRight: 10,
                },
              ]}
              onPress={() => setShow(true)}
            >
              <Text style={{ marginRight: 5, fontSize: 18 }}>
                {countryFlag}
              </Text>
              <Text style={{ fontSize: 16 }}>{countryCode}</Text>

              <CountryPicker
                show={show}
                lang="en"
                style={{ modal: { height: 500, backfaceVisibility: "green" } }}
                pickerButtonOnPress={(item) => {
                
                  setCountryCode(item.dial_code);
                  setCountryFlag(item.flag);
                  setShow(false);
                }}
              />
            </Pressable>
          </View>

          <View
            style={[
              styles.txtInputBox,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <TextInput
              placeholder="Enter your Password"
              secureTextEntry={hidePass ? true : false}
            />
            {hidePass ? (
              <Pressable onPress={() => sethidePass(false)}>
                <Ionicons name="md-eye-off" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable onPress={() => sethidePass(true)}>
                <Ionicons name="eye" size={24} color="black" />
              </Pressable>
            )}
          </View>
        </View>
      )}

      {/* Login Button And SignUo Button */}
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity
          style={[styles.loginBtnInnerBox, { marginBottom: 30 }]}
          onPress={ SignUpHandler}
        >
          <Text style={styles.loginBtnText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtnInnerBox} onPress={() => navigation.goBack()}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnBox: {
    paddingVertical: 10,
    width: "40%",
    borderWidth: 0.3,
    alignItems: "center",
  },
  txtInputBox: {
    width: "80%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.4,
  },
  loginBtnContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  loginBtnInnerBox: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#1dc552",
    paddingVertical: 12,
    borderRadius: 6,
  },
  loginBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
