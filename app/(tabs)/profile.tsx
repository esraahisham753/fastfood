import { signOut } from '@/lib/appwrite'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try
    {
      await signOut();
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