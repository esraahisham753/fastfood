import { Extra } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ExtraItem = ({ extra: {name, price, image} }: {extra: Extra}) => {
    return (
        <View>
            <View>
                <Image source={image} alt={`${name} topping image`} />
            </View>
            <View>
                <Text>{name}</Text>
                <TouchableOpacity>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExtraItem;