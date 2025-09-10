import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from "../types/navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


const AppNavigator = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }} >
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="InApp" component={InApp} />
                    <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            </SafeAreaView>
        </GestureHandlerRootView>

    );
}
export default AppNavigator;

const InApp = () => {
    return (
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
                }} />
            <Tab.Screen name="Search" component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={24} color="black" />
                    ),
                    title: 'Search',
                    headerShown: false,
                }} />
        </Tab.Navigator>

    );
}

