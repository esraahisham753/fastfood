import { signOut } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsAuthenticated, setUser } = useAuthStore();

  const handleLogout = async () => {
    setIsLoading(true);

    try
    {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/(auth)/signin');
    }
    catch (e)
    {
      Alert.alert('Failed to logout');
    }
    finally
    {
      setIsLoading(false);
    }
  }
  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Button title={isLoading ? 'Logging out...' : 'Logout'} onPress={handleLogout} disabled={isLoading}/>
    </SafeAreaView>
  )
}

export default profile