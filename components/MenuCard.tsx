import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { router } from "expo-router";
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';


const MenuCard = ({item: {$id, image_url, name, price}}: {item: MenuItem}) => {
    const { addItem } = useCartStore();
    
    const handleItemPress = (id: string) => {
        router.push(`/menuitem?id=${id}`);
    };

    return (
        <TouchableOpacity className="menu-card" style={Platform.OS == "android" ? {elevation: 10, shadowColor: "#878787"} : {}} onPress={() => handleItemPress($id)}>
            <Image source={{uri: image_url}} className="size-32 absolute -top-10" resizeMode="contain"/>
            <View className="flex-col gap-2 justify-center items-center mb-6">
                <Text numberOfLines={1} className="base-regular text-center font-bold">{name}</Text>
                <Text className="paragraph-semibold text-gray-200">From ${price}</Text>
            </View>
            <TouchableOpacity onPress={() => { addItem({id: $id, name, price, image_url}) }}>
                <View className="flex-row gap-2 justify-center items-center">
                    <Image source={images.plus} className="size-5"/>
                    <Text className="text-primary paragraph-bold">Add to Cart</Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard;