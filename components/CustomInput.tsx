import { CustomInputProps } from '@/type';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({ 
    placeholder="Enter Text",
    value,
    onChangeText,
    label,
    secureTextEntry=false,
    keyboardType="default"
 } : CustomInputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  
  return (
    <View className='w-full'>
      <Text className='label'>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888" 
      />
    </View>
  )
}

export default CustomInput