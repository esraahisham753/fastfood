import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Category} from "@/type";
import {router, useLocalSearchParams} from "expo-router";
import {useState} from "react";
import cn from 'clsx';

const Filter = ({ categories }: {categories: Category[]}) => {
    const { category } = useLocalSearchParams();
    const [active, setActive] = useState( category || '');
    const filterData: (Category | {$id: string; name: string})[] = categories ?
        [{$id: 'all', name:'All'}, ...categories] :
        [{$id: 'all', name:'All'}];

    const handlePress = (itemId: string) => {
        setActive( itemId );

        if (itemId === 'all') router.setParams({ category: undefined });
        else router.setParams({ category: itemId});
    };

    return (
        <FlatList
            data={filterData}
            keyExtractor={(item) => item.$id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-2 gap-2 mb-4 mt-8"
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        className={cn('filter', active === item.$id ? 'bg-amber-500' : 'bg-white')}
                        onPress={() => handlePress(item.$id)}
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    );
};

export default Filter;