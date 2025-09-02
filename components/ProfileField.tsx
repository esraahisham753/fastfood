import { ProfileFieldProps } from "@/type";
import { Image, Text, View } from "react-native";

const ProfileField = ({ label, value, icon }: ProfileFieldProps) => {
    return (
        <View className="profile-field">
            <View className="profile-field__icon">
                <Image source={icon} className="size-5" resizeMode="contain"/>
            </View>
            <View className="flex-col gap-0.5">
                <Text className="body-regular text-gray-500">{label}</Text>
                <Text className="body-semibold">{value}</Text>
            </View>
        </View>
    )
};

export default ProfileField;