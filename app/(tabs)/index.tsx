import { images, offers } from "@/constants";
import { getCategory } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import useAuthStore from "@/store/auth.store";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cart from "../../components/Cart";
import "../global.css";

export default function Index() {
  const isEven = (index: number) => index % 2 === 0;
  const { category } = useLocalSearchParams<{ category: string }>();

  const { data, refetch } = useAppwrite({
    fn: getCategory,
    params: { name: "" },
  });

  useEffect(() => {
    if (category) {
      refetch({
        name: category,
      });
    }

    // console.log("category id from useEffect", data?.$id);
  }, [category]);

  const { user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven(index) ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffff22" }}
                onPress={() => {
                  router.setParams({category: 'pizzas'});
                  router.push(`/search?category=${data?.$id}`);
                }}
              >
                {({ pressed }) => {
                  return (
                    <Fragment>
                      <View className={"h-full w-1/2"}>
                        <Image
                          source={item.image}
                          className={"size-full"}
                          resizeMode={"contain"}
                        />
                      </View>
                      <View
                        className={cn(
                          "offer-card__info",
                          isEven(index) ? "pl-10" : "pr-10"
                        )}
                      >
                        <Text className={"text-white h1-bold leading-tight"}>
                          {item.title}
                        </Text>
                        <Image
                          source={images.arrowRight}
                          tintColor={"#ffffff"}
                          className="size-10"
                          resizeMode="contain"
                        />
                      </View>
                    </Fragment>
                  );
                }}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName={"pb-28 px-5"}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start ">
              <Text className="text-primary small-bold">Deliver To:</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Egypt</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <Cart />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
