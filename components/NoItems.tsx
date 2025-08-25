import { images } from "@/constants";
import { Image, Text, View } from "react-native";

const NoItems = () => {
    return (
        <View className="flex flex-col gap-6 items-center justify-center">
            <Image source={images.emptyState} className="size-48" resizeMode="contain" />
            <Text className="h3-bold">Nothing matched your search</Text>
            <Text className="text-center text-gray-200">Try a different search term or check for typos.</Text>
        </View>
    )
}

export default NoItems;