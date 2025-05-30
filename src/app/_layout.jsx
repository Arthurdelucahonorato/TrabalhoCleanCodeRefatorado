import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import useLoadFonts from '../../hooks/useLoadFonts';
export { ErrorBundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'BoasVindas',
};

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { fontsLoaded } = useLoadFonts();

  useEffect(() => {
    async function prepareApp() {
      try {

        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {

        setAppIsReady(true);
      }
    }

    prepareApp();
  }, []);

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.cinzaBase },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
        title={false}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
        title={false}
      />
    </Stack>
  );
}
