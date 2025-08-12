import CustomButtom from '@/components/CustomButtom'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, View } from 'react-native'

const signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({email: '', password: ''});

  const submit = async () => {
    const {email, password} = form;

    setIsSubmitting(true);

    if (!email || !password) return Alert.alert('Error', 'Please enter valid email and password');

    try
    {
      await signIn({ email, password });
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
      <CustomButtom title='Sign In' onPress={submit} isLoading={isSubmitting}/>
      <View className='flex flex-row justify-center mt-5 gap-2'>
        <Text className='base-regular text-gray-100'>Don't have an account?</Text>
        <Link href='/signup' className='base-bold text-primary'>Sign Up</Link>
      </View>
    </View>
  )
}

export default signin