import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, removeItem } = useCartStore();

    // Calculate the total price for this item including customizations and quantity
    const calculateItemTotalPrice = () => {
        const basePrice = item.price;
        const customizationsPrice = item.customizations?.reduce(
            (total, customization) => total + customization.price,
            0
        ) ?? 0;
        const itemTotalPrice = (basePrice + customizationsPrice) * item.quantity;
        return itemTotalPrice;
    };

    return (
        <View className="cart-item">
            <View className="flex flex-row items-center gap-x-3">
                <View className="cart-item__image">
                    <Image
                        source={{ uri: item.image_url }}
                        className="size-4/5 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View>
                    <Text className="base-bold text-dark-100">{item.name}</Text>
                    <Text className="paragraph-bold text-primary mt-1">
                        ${calculateItemTotalPrice().toFixed(2)}
                    </Text>
                    <Text className="paragraph-small text-gray-400">
                        ${(item.price + (item.customizations?.reduce((total, c) => total + c.price, 0) ?? 0)).toFixed(2)} each
                    </Text>
                    
                    {/* Show customizations if any */}
                    {item.customizations && item.customizations.length > 0 && (
                        <View className="mt-1">
                            {item.customizations.map((customization, index) => (
                                <Text key={index} className="paragraph-small text-gray-500">
                                    • {customization.name} (+${customization.price})
                                </Text>
                            ))}
                        </View>
                    )}

                    <View className="flex flex-row items-center gap-x-4 mt-2">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.minus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>

                        <Text className="base-bold text-dark-100">{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.customizations!)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor={"#FF9C01"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => removeItem(item.id, item.customizations!)}
                className="flex-center"
            >
                <Image source={images.trash} className="size-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;
