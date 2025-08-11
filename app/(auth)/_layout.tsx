import CustomButtom from '@/components/CustomButtom'
import CustomInput from '@/components/CustomInput'
import { images } from '@/constants'
import { Slot } from 'expo-router'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'

export default function _layout() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <ScrollView className='bg-white w-full' keyboardShouldPersistTaps="handled">
        <View className='w-full relative' style={{height: Dimensions.get('screen').height / 2.25}}>
          <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch' />
          <Image source={images.logo} className='self-center absolute -bottom-16 size-48 z-10'/>
        </View>
        <CustomInput
          placeholder='Enter email'
          value=''
          keyboardType='email-address'
          label='Email' 
          onChangeText={() => {}}
        />
        <CustomButtom />
      </ScrollView>
      <Slot />
    </KeyboardAvoidingView>
  )
}
