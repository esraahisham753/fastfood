import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'

const signup = () => {
  return (
    <View>
      <Text>signup</Text>
      <Button title='Sign Up' onPress={() => router.push('/signin')}/>
    </View>
  )
}

export default signup