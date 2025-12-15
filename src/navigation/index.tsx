import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/home/view';
import { LoginScreen } from '@/screens/login/view';
import { SignupScreen } from '@/screens/signup/view';
import { TaskFormScreen } from '@/screens/task-form/view';
import { Task } from '@/types/tasks/domain';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthProvider } from '@/providers/AuthProvider';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  TaskForm: { task?: Task } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const user = useAuthStore(state => state.user);

  return (
    <AuthProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="TaskForm"
              component={TaskFormScreen}
              options={{
                headerShown: true,
                title: 'Tarefa',
                headerStyle: { backgroundColor: '#ffffff' },
                headerTitleStyle: { fontSize: 16, fontWeight: '600' },
              }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Entrar', headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: '' }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}
