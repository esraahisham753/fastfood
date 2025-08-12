import CustomButtom from '@/components/CustomButtom'
import CustomInput from '@/components/CustomInput'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({name: '', email: '', password: ''});

  const submit = async () => {
    setIsSubmitting(true);

    if (!form.name || !form.email || !form.password) return Alert.alert('Error', 'Please enter valid name, email and password');

    try
    {
      Alert.alert('success', 'User signed up successfully');
      router.replace('/');
    }
    catch (error: any)
    {
      Alert.alert('Error', error.message);
    }
    finally
    {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <CustomInput
        placeholder='Enter full name'
        value={form.name}
        label='Full Name' 
        onChangeText={(text) => {setForm((prev) => ({...prev, name: text}))}}
      />
      <CustomInput
        placeholder='Enter email'
        value={form.email}
        keyboardType='email-address'
        label='Email' 
        onChangeText={(text) => {setForm((prev) => ({...prev, email: text}))}}
      />
      <CustomInput
        placeholder='Enter password'
        value={form.password}
        secureTextEntry={true}
        label='Password' 
        onChangeText={(text) => {setForm((prev) => ({...prev, password: text}))}}
      />
      <CustomButtom title='Sign Up' onPress={submit} isLoading={isSubmitting}/>
      <View className='flex flex-row justify-center mt-5 gap-2'>
        <Text className='base-regular text-gray-100'>Already have an account?</Text>
        <Link href='/signin' className='base-bold text-primary'>Sign In</Link>
      </View>
    </View>
  )
}

export default signin