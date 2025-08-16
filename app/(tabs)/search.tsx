import {Text, View, Button, FlatList} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import seed from "@/lib/seed";
import useAppwrite from "@/lib/useAppwrite";
import {getCategories, getSearchMenus} from "@/lib/appwrite";
import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";

const search = () => {
    const { category, query } = useLocalSearchParams<{query: string; category: string}>();

    const { data: menus, refetch: menusRefetch, loading: menusLoading } = useAppwrite({
        fn: getSearchMenus,
        params: {
            category: '',
            query: '',
            limit: 6
        }
    });

    const { data: categories } = useAppwrite({
        fn: getCategories,
        params: {}
    });

    useEffect(() => {
        menusRefetch({
         query, category, limit: 6
        });
    }, [query, category]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
          data={menus}
          renderItem={({item, index}) => {
            return (
                <View className="flex-1 max-w-[48%]">
                    <Text>Menu Card</Text>
                </View>
            )
      }}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          columnWrapperClassName={"gap-7"}
          contentContainerClassName={"gap-7 px-5"}
      />
    </SafeAreaView>
  )
}

export default search