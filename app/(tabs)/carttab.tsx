import {FlatList, Text, View} from 'react-native';
import cn from "clsx";
import {PaymentInfoStripeProps} from "@/type";
import {SafeAreaView} from "react-native-safe-area-context";
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";

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
                    <View>

                    </View>
                )
            }}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => <CustomHeader />}
        />
    </SafeAreaView>
  )
}

export default carttab