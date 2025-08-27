import { Extra } from "@/type";
import { Text, View } from "react-native";

const ExtraItem = ({ extra }: {extra: Extra}) => {
    return (
        <View>
            <Text>{extra.name}</Text>
        </View>
    )
}

export default ExtraItem;