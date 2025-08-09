import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'

const signin = () => {
  return (
    <View>
      <Text>signin</Text>
      <Button title='Sign In' onPress={() => router.push('/signup')}/>
    </View>
  )
}

export default signin