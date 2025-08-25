import Cart from "@/components/Cart";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import NoItems from "@/components/NoItems";
import Searchbar from "@/components/Searchbar";
import { getCategories, getSearchMenus } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

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
        fn: getCategories
    });

    useEffect(() => {
        menusRefetch({
         query, category, limit: 6
        }); 
    }, [query, category, categories]);

    /* if (!categories || categories.length === 0)
    {
        return (
            <Text className="text-3xl">Loading...</Text>
        );
    }*/

  return (
    <SafeAreaView className="bg-[#FAFAFA] h-full">
      <FlatList
          data={menus}
          renderItem={({item, index}) => {
              const rightColumn = index % 2 == 1;
            return (
                <View className={cn("flex-1 max-w-[48%]", rightColumn ? 'mt-10' : 'mt-0')}>
                    <MenuCard item={item as unknown as MenuItem} />
                </View>
            )
      }}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          columnWrapperClassName={"gap-7"}
          contentContainerClassName={"gap-7 px-5 pb-32"}
          ListHeaderComponent={() => {
              // @ts-ignore
              // @ts-ignore
              return (
                  <View className="my-8">
                      <View className="flex-row flex-between mb-4">
                          <View className="flex-col gap-1.5">
                              <Text className="small-bold text-primary uppercase">Search</Text>
                              <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                          </View>
                          <Cart />
                      </View>
                      <Searchbar />
                      { menus && menus.length > 0 && <Filter categories={(categories as unknown as Category[]) || []} /> }
                  </View>
              )
          }}
          ListEmptyComponent={() => {
              return (
                  !menusLoading ? <NoItems /> : <Text>Loading...</Text>
              )
          }}

      />
    </SafeAreaView>
  )
}

export default search