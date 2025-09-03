import CustomButtom from '@/components/CustomButtom'
import CustomHeader from '@/components/CustomHeader'
import ProfileField from '@/components/ProfileField'
import { images } from '@/constants'
import { signOut } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setIsAuthenticated, setUser, user } = useAuthStore();

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
    <SafeAreaView className='pb-16'>
      <CustomHeader title='Profile' />
      <View className='flex-center flex-row'>
        <View className='profile-avatar'>
          <Image source={images.avatar} className='size-28'/>
          <TouchableOpacity className='profile-edit'>
            <Image source={images.pencil}  className='size-5' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='mt-12 pl-5 flex-col gap-3'>
        <ProfileField label='FullName' value={user?.name || ''} icon={images.user} />
        <ProfileField label='Email' value={user?.email || ''} icon={images.envelope} />
        <ProfileField label='Phone' value={user?.phone || ''} icon={images.phone} />
        <ProfileField label='Address 1 - (Home)' value={user?.address_home || ''} icon={images.location} />
        <ProfileField label='Address 2 - (Work)' value={user?.address_work || ''} icon={images.location} />
      </View>
      <CustomButtom title='Edit Profile' style='mt-10  mb-5 w-[90%] mx-auto bg-primary/5 border border-[#FE8C00]' textStyle='text-[#FE8C00]' />
      <CustomButtom title='Logout' style='w-[90%] mb-24 mx-auto bg-error/5 border border-[#F14141]' textStyle='text-[#F14141]' leftIcon={<Image source={images.logout} className='size-5' />} onPress={handleLogout} />
    </SafeAreaView>
  )
}

export default profile
