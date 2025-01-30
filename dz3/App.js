import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Для примера иконки

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="О приложении"
        onPress={() => navigation.navigate('HomeAbout')}
      />
    </View>
  );
}

function HomeAboutScreen() {
  return <Text>О приложении</Text>;
}

function NewsScreen() {
  return <Text>News Screen</Text>;
}

function ChatScreen() {
  return <Text>Chat Screen</Text>;
}

function SettingsScreen() {
  return <Text>Settings Screen</Text>;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="home" size={24} />
            </View>
          ),
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"
            />
          ),
        }}
      />
      <Stack.Screen name="HomeAbout" component={HomeAboutScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
