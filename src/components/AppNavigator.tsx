import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { use } from "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="InApp" component={InApp} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default AppNavigator;

const InApp = () => {
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '39B78D',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
            }}>
            <Tab.Screen name="Home" component={HomeScreen} 
              options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    title: 'home',
                    headerShown: false,
                }}/>
            <Tab.Screen name="Search" component={SearchScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={24} color="black" />
                    ),
                    title: 'Search',
                    headerShown: false,
                }}/>
        </Tab.Navigator>

    );
}