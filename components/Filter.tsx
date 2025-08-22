import { Category } from "@/type";
import cn from 'clsx';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
    const { category } = useLocalSearchParams<{category: string}>();
    const [active, setActive] = useState<string>(category || 'all');

    useEffect(() => {
        setActive(category || 'all');
    }, [category])

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