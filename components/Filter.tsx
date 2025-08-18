import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Category} from "@/type";
import {useLocalSearchParams} from "expo-router";
import {useState} from "react";

const Filter = ({ categories }: {categories: Category[]}) => {
    const { category } = useLocalSearchParams();
    const [active, setActive] = useState( category || '');
    const filterData: (Category | {$id: string; name: string})[] = categories ?
        [{$id: 'all', name:'all'}, ...categories] :
        [{$id: 'all', name:'all'}];

    return (
        <FlatList
            data={filterData}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
};

export default Filter;