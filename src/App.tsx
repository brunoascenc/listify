import './global.css';
import { StatusBar } from 'react-native';
import { Home } from '@/screens/home/view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Home />
    </SafeAreaProvider>
  );
}

export default App;
