import CartItem from "@/components/CartItem";
import CustomButtom from "@/components/CustomButtom";
import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from "@/type";
import cn from "clsx";
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const carttab = () => {
    const { items, getTotalItems, getTotalPrice } = useCartStore();

  return (
    <SafeAreaView>
        <FlatList
            data={items}
            renderItem={({item}) => (
                <CartItem item={item} />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <View className="px-6 pt-8">
                    <CustomHeader />
                </View>
            )}
            ListFooterComponent={() => {
                if (items.length === 0) return null;
                
                return (
                    <View className="flex-col gap-8 mt-4">
                        <View className="border rounded-2xl border-[#EDEDED] px-4 py-8 flex-col gap-5 w-[90%] mx-auto">
                            <Text className="h3-bold">Payment Summary</Text>
                            <PaymentInfoStripe  label={`Total items (${getTotalItems()})`} value={`$${getTotalPrice()}`} />
                            <PaymentInfoStripe label="Delivery Fee" value="Free" />
                            <PaymentInfoStripe label="Discount" valueStyle="text-green-700" value="-$0.5" />
                            <View className="border-t-2 border-[#EDEDED]" />
                            <PaymentInfoStripe label="Total" value={`$${getTotalPrice() - 0.5}`} />
                        </View>
                        <CustomButtom style="w-[90%] mx-auto" textStyle="paragraph-bold" title="Order Now"/>
                    </View>   
                );
            }}
            ListEmptyComponent={() => <Text className="text-center text-gray-200">Cart is Empty</Text>}
            contentContainerClassName="pb-32"
        />
    </SafeAreaView>
  )
}

export default carttab