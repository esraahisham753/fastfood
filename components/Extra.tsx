import { Extra } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ExtraItem = ({ 
  extra: {name, price, image}, 
  type, 
  addCustomization,
  removeCustomization,
  isSelected = false 
}: {
  extra: Extra, 
  type: string, 
  addCustomization: (extra: Extra, type: string) => void,
  removeCustomization?: (extra: Extra) => void,
  isSelected?: boolean
}) => {
    const handlePress = () => {
        const myExtra = {name, price, image};
        if (isSelected && removeCustomization) {
            removeCustomization(myExtra);
        } else {
            addCustomization(myExtra, type);
        }
    }
    
    return (
        <View 
            className={`rounded-2xl w-[110px] ${isSelected ? 'bg-[#E4004B]' : 'bg-[#3C2F2F]'}`}
            style={{
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        >
            <View className="h-[80px] rounded-t-2xl bg-white rounded-b-[25px] flex items-center justify-center">
                <Image source={image} alt={`${name} customiztion image`} className="size-20"/>
            </View>
            <View className="flex flex-row justify-between p-2 items-center">
                <Text className="paragraph-medium text-white line-clamp-1">{name}</Text>
                <TouchableOpacity onPress={handlePress}>
                    <View className={`rounded-full w-6 h-6 flex justify-center items-center ${isSelected ? 'bg-white' : 'bg-[#E4004B]'}`}>
                        <Text className={`font-bold text-lg ${isSelected ? 'text-[#E4004B]' : 'text-white'}`}>
                            {isSelected ? '✓' : '+'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExtraItem;