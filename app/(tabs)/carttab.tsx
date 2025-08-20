import {FlatList, Text, View} from 'react-native';
import cn from "clsx";
import {PaymentInfoStripeProps} from "@/type";
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";
import CustomButtom from "@/components/CustomButtom";

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
            renderItem={() => {
                return (
                    <View className="flex-col gap-16">
                        <View className="border rounded-2xl border-gray-100 px-4 py-8 flex-col gap-5 w-[95%] mx-auto">
                            <Text className="h3-bold">Payment Summary</Text>
                            <PaymentInfoStripe labelStyle="base-semibold" valueStyle="base-bold" label={`Total items (${getTotalItems()})`} value={`$${getTotalPrice()}`} />
                            <PaymentInfoStripe labelStyle="base-semibold" valueStyle="base-bold" label="Delivery Fee" value="Free" />
                            <PaymentInfoStripe labelStyle="base-semibold" valueStyle="base-bold" label="Discount" value="-$0.5" />
                            <View className="border-t-2 border-gray-100" />
                            <PaymentInfoStripe label="Total" value={`$${getTotalPrice() - 0.5}`} />
                        </View>
                        <CustomButtom title="Order Now"/>
                    </View>
                )
            }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
                <View className="px-6 pt-8">
                    <CustomHeader />
                </View>
            )}
            ListEmptyComponent={() => <Text>Cart is Empty</Text>}
        />
    </SafeAreaView>
  )
}

export default carttab