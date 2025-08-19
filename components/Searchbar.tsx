import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import {images} from "@/constants";
import {useState} from "react";
import {router, useLocalSearchParams} from "expo-router";

const Searchbar = () => {
    const params = useLocalSearchParams<{query?: string}>()
    const [query, setQuery] = useState(params.query);

    const handleChange = (value: string) => {
        setQuery(value);
        router.setParams({query: value});
    };

    return (
        <View className="searchbar">
            <TextInput
                className="flex-1 p-5"
                placeholder="Search for pizzas, burgers, ..."
                placeholderTextColor="#A5A5A5"
                value={query}
                onChangeText={handleChange}
            />
            <TouchableOpacity className="pr-5" onPress={() => console.log("clicked")}>
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Searchbar;