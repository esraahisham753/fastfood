import { Text, View, Button } from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "@/lib/seed";

const search = () => {
  return (
    <SafeAreaView>
      <Text>search</Text>
        <Button title="seed" onPress={() => {seed().catch(err => console.log("Failed to seed the database", err))}} />
    </SafeAreaView>
  )
}

export default search