import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DestinationScreen from "../screens/DestinationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BeachScreen from '../screens/BeachScreen';
import MountainScreen from '../screens/MountainScreen';
import CampScreen from '../screens/CampScreen';
import ForestScreen from '../screens/ForestScreen';
import SunsetScreen from "../screens/SunsetScreen";
import HikingScreen from "../screens/HikingScreen";
import OceanScreen from "../screens/OceanScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
                <Stack.Screen name="Destination" component={DestinationScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Beach" component={BeachScreen} />
                <Stack.Screen name="Mountain" component={MountainScreen} />
                <Stack.Screen name="Camp" component={CampScreen} />
                <Stack.Screen name="Forest" component={ForestScreen} />
                <Stack.Screen name="Sunset" component={SunsetScreen} />
                <Stack.Screen name="Hiking" component={HikingScreen} />
                <Stack.Screen name="Ocean" component={OceanScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
