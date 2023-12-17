import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screen/Login";
import SignUp from "./src/screen/SignUp";
import Home from "./src/screen/Home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} 
          options={{
            title:'Profile',
            headerStyle:{
              backgroundColor:'#3498db'
            }
          }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
