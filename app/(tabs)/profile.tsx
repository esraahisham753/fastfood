import CustomHeader from '@/components/CustomHeader'
import { images } from '@/constants'
import { signOut } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
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
      <CustomHeader title='Profile' />
      <View className='flex-center flex-row'>
        <Image source={images.avatar} className='profile-avatar' />
        <TouchableOpacity className='profile-edit'>
          <Image source={images.pencil}  className='size-5' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default profile