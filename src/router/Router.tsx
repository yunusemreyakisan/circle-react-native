import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../pages/Splash/SplashScreen";
import UserListScreen from "../pages/UserListScreen";

// Create a Stack navigator
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Hide header for SplashScreen
        />
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: "User List" }} // Title for the UserListScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
