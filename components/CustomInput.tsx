import { CustomInputProps } from '@/type';
import cn from 'clsx';
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
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        autoCapitalize='none'
        autoCorrect={false}
        className={cn('input', isFocus ? 'border-primary' : 'border-gray-300')}
      />
    </View>
  )
}

export default CustomInput