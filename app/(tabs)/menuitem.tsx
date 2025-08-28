import CustomHeader from '@/components/CustomHeader';
import ExtraItem from '@/components/Extra';
import { images, toppings } from '@/constants';
import { getMenuItem } from '@/lib/appwrite';
import { MenuItem } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rating from '../../components/Rating';

const MenuItemScreen = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchMenuItem = async () => {
      // console.log("Fetching menu item", id);
      try {
        const fetchedMenuItem = await getMenuItem({id: id as string});
        setItem(fetchedMenuItem as unknown as MenuItem);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      }
    }
    fetchMenuItem();
  }, [id])
  
  return (
    <SafeAreaView>
      <CustomHeader />
      <View className='flex flex-row justify-between pl-4'>
        <View>
            <Text className='h3-bold mb-2 capitalize'>{item?.name}</Text>
            <Text className='body-regular text-gray-200 mb-6'>{item?.description}</Text>
            <Rating rating={item?.rating || 0} />
            <Text className='mt-4 base-bold'><Text className='text-primary'>$</Text>{item?.price}</Text>
            <View className='mt-12 flex flex-row gap-10'>
                <View>
                    <Text className='base-medium text-gray-200'>Calories</Text>
                    <Text className='paragraph-semibold'>{item?.calories} Cal</Text>
                </View>
                <View>
                    <Text className='base-medium text-gray-200'>Protein</Text>
                    <Text className='paragraph-semibold'>{item?.protein} g</Text>
                </View>
            </View>
        </View>
        <View>
            <Image source={{ uri: item?.image_url }} alt='Item image' className='size-64' resizeMode='contain' />
        </View>
      </View>
      <View className='flex flex-row justify-between items-center p-4 bg-primary/5 w-[90%] mx-auto rounded-3xl mt-8'>
        <View>
          <Text className='base-medium'><Text className='text-primary base-bold'>$</Text> Free Delivery</Text>
        </View>
        <View>
          <View className='flex flex-row gap-2'>
            <Image source={images.clock} className='size-5' resizeMode='contain'/>
            <Text className='base-medium'>20-30 mins</Text>
          </View>
        </View>
        <View>
          <View className='flex flex-row gap-2'>
            <Image source={images.star} className='size-5' resizeMode='contain'/>
            <Text className='base-medium'>4.5</Text>
          </View>
        </View>
      </View>
      <View className='mt-4 p-6'>
        <Text className='paragraph-medium text-gray-500 leading-7'>
        The Cheeseburger Wendy's Burger is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, tomato, & crunchy pickles.
        </Text>
      </View>
      <View className='pl-6'>
        <Text className='base-semibold'>Toppings</Text>
        <FlatList
          data={toppings}
          renderItem={({ item }) => <ExtraItem extra={item} />}
          keyExtractor={(item) => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          style= {{ height: 500 }}
          contentContainerClassName='mb-8'
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>
      <View style={{ height: 500 }} />
    </SafeAreaView>
  )
}

export default MenuItemScreen