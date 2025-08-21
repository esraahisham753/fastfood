import { Category } from "@/type";
import cn from 'clsx';
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

const Filter = ({ categories }: {categories: Category[]}) => {
    const { category } = useLocalSearchParams();
    console.log('Category from filter: ', category);
    const [active, setActive] = useState( category || 'all');
    console.log('active', active);
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
                console.log("active", active);
                console.log("item id", item.$id);
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