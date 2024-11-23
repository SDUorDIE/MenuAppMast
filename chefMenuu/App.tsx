import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './screens/homescreen';
import { FilterScreen } from './screens/filterscreen';
import { ManageMenu } from './screens/managedish';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}
          options={{ title: 'Chefill' }}
        />
        <Stack.Screen 
          name="FilterScreen" 
          component={FilterScreen}
          options={{ title: 'Filter Menu' }}
        />
        <Stack.Screen 
          name="ManageMenuScreen" 
          component={ManageMenu}
          options={{ title: 'Manage Menu' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});