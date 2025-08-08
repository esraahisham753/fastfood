import { offers } from "@/constants";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
 
export default function Index() {
  return (
    <SafeAreaView>
      <FlatList
        data={offers}
        renderItem={({ item }) => (<div />)}
      />
    </SafeAreaView>
  );
}