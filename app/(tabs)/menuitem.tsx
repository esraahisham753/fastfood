import CustomHeader from '@/components/CustomHeader';
import { getMenuItem } from '@/lib/appwrite';
import { MenuItem } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rating from '../../components/Rating';

const MenuItemScreen = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchMenuItem = async () => {
      console.log("Fetching menu item", id);
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
      <View className='flex flex-row justify-between'>
        <View>
            <Text className='h3-bold mb-4'>{item?.name}</Text>
            <Text className='body-regular text-gray-200 mb-2'>{item?.description}</Text>
            <Rating rating={item?.rating || 0} />
            <Text><Text>$</Text>{item?.price}</Text>
            <View>
                <View>
                    <Text>Calories</Text>
                    <Text>{item?.calories}</Text>
                </View>
                <View>
                    <Text>Protein</Text>
                    <Text>{item?.protein}</Text>
                </View>
            </View>
        </View>
        <View>
            <Image source={{ uri: item?.image_url }} alt='Item image' className='size-48' resizeMode='contain' />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MenuItemScreen