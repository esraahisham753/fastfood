import {Image, Platform, Text, TouchableOpacity} from 'react-native';
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";


const MenuCard = ({item: {image_url, name, price}}: {item: MenuItem}) => {
    console.log("image_url", image_url);
    return (
        <TouchableOpacity className="menu-card" style={Platform.OS == "android" ? {elevation: 10} : {}}>
            <Image source={{uri: image_url}} className="size-32 absolute -top-10" resizeMode="contain"/>
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}

export default MenuCard;