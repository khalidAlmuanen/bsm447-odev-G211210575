import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ListeScreen from './src/screens/ListeScreen';
import DetayScreen from './src/screens/DetayScreen';
import KaydedilenlerScreen from './src/screens/KaydedilenlerScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#22577a',
        tabBarIcon: ({ color, size }) => (
          <Text style={{ color, fontSize: size }}>
            {route.name === 'Liste' ? '≡' : '☆'}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Liste" component={ListeScreen} />
      <Tab.Screen name="Kaydedilenler" component={KaydedilenlerScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          {/* Detay, sekmelerin üstünde açılır. */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detay"
            component={DetayScreen}
            options={{ headerBackTitle: 'Geri' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
