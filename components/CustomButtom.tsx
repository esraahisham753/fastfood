import { CustomButtonProps } from '@/type'
import cn from 'clsx'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const CustomButtom = ({
  title='Click Me',
  style,
  textStyle,
  isLoading=false,
  onPress,
  leftIcon
}: CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn flex-row justify-center items-center gap-2', style)} onPress={onPress}>
      {leftIcon}
      <View className='flex-center flex-row'>
        {
          isLoading ? (
            <ActivityIndicator size='small' color='white' />
          ) :
          (
            <Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>
          )
        }
      </View>
    </TouchableOpacity>
  )
}

export default CustomButtom
