import './global.css';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '@/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider style={styles.app}>
      <StatusBar barStyle="dark-content" />
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
