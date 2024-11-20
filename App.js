import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';

import LoginScreen from './pages/LoginScreen';
import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
import FavoriteScreen from './pages/FavoriteScreen';
import MenuScreen from './pages/MenuScreen';
import CategoryPage from './pages/CategoryPage';
import MealDetail from './pages/MealDetail';
import { FavoriteProvider } from './pages/FavoriteContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="CategoryPage" component={CategoryPage} />
      <Stack.Screen name="MealDetail" component={MealDetail} />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="MealDetail" component={MealDetail} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'lightgray',
          marginHorizontal: 16,
          borderRadius: 24,
          height: 64,
          marginBottom: 16,
          shadowOpacity: 0,
          elevation: 1,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            color = focused ? 'black' : 'lightgray';
          } else if (route.name === 'Profile') {
            iconName = 'person';
            color = focused ? 'black' : 'lightgray';
          } else if (route.name === 'Favorite') {
            iconName = 'star';
            color = focused ? 'black' : 'lightgray';
          }
          return <Octicons name={iconName} size={24} color={color} style={{ paddingVertical: 10 }} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorite" component={FavoriteStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </FavoriteProvider>
  );
}
