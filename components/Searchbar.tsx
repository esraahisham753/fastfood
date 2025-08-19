import {View, Text, TextInput, TouchableOpacity, Image} from "react-native";
import {images} from "@/constants";
import {useState} from "react";
import {router, useLocalSearchParams} from "expo-router";

const Searchbar = () => {
    const params = useLocalSearchParams<{query?: string}>()
    const [query, setQuery] = useState(params.query);

    const handleChange = (value: string) => {
        setQuery(value);
        if (!value) router.setParams({query: undefined});
    };

    const handleSubmit = () => {
        if (query) router.setParams({query})
    }

    return (
        <View className="searchbar">
            <TextInput
                className="flex-1 p-5"
                placeholder="Search for pizzas, burgers, ..."
                placeholderTextColor="#A5A5A5"
                value={query}
                onChangeText={handleChange}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
            />
            <TouchableOpacity className="pr-5" onPress={handleSubmit}>
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode="contain"
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
        </View>
    );
};

export default Searchbar;