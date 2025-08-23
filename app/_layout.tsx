import useAuthStore from '@/store/auth.store';
import * as Sentry from '@sentry/react-native';
import { useFonts } from 'expo-font';
import { router, Slot, SplashScreen, Stack, useRootNavigationState, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import './global.css';

Sentry.init({
  dsn: 'https://1f00b10b2b8d78ed54ab2bce295f9ad0@o4509837272219649.ingest.de.sentry.io/4509837274251344',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  })
  const { isLoading, fetchAuthenticatedUser, user } = useAuthStore();
  const navigationState = useRootNavigationState();
  const segments = useSegments();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      //console.log("fonts loaded");
      SplashScreen.hideAsync();
    };
  }, [fontsLoaded, error])

  useEffect(() => {
    fetchAuthenticatedUser();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !navigationState?.key) return;

    const isAuthGroup = segments[0] === '(auth)';

    if (!user && !isAuthGroup)
    {
      router.replace("/(auth)/signin");
    }
    else if (user && isAuthGroup) 
    {
      router.replace("/(tabs)");
    }
  }, [user, segments, navigationState?.key, mounted]);

  if (!fontsLoaded || isLoading) return <Slot />;

  return <Stack screenOptions={{headerShown: false}}/>;
});