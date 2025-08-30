import CustomHeader from '@/components/CustomHeader';
import ExtraItem from '@/components/Extra';
import { images, sides, toppings } from '@/constants';
import { getMenuItem } from '@/lib/appwrite';
import { useCartStore } from '@/store/cart.store';
import { CartCustomization, CartItemType, Extra, MenuItem } from '@/type';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rating from '../../components/Rating';

const MenuItemScreen = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [customizations, setCustomizations] = useState<CartCustomization[]>([]);
  const [cartItem, setCartItem] = useState<CartItemType | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (!id) return;
    
    const fetchMenuItem = async () => {
      // console.log("Fetching menu item", id);
      try {
        const fetchedMenuItem = await getMenuItem({id: id as string});
        setItem(fetchedMenuItem as unknown as MenuItem);
        // console.log(fetchedMenuItem);
        setItemPrice((fetchedMenuItem as unknown as MenuItem)?.price);
        setCartItem({
          id: fetchedMenuItem.$id,
          name: fetchedMenuItem.name,
          price: fetchedMenuItem.price,
          image_url: fetchedMenuItem.image_url,
          quantity: 1,
          customizations: []
        });
      } catch (error) {
        console.error("Error fetching menu item:", error);
      }
    }
    fetchMenuItem();
  }, [id])

  const calculateItemPrice = () => {
    const customizationsPrice = customizations.reduce((prev, cur) => {
      return prev + cur.price;
    }, 0);

    return (customizationsPrice + (item?.price || 0)) * (cartItem?.quantity || 1);
  }

  useEffect(() => {
    setItemPrice(calculateItemPrice());
  }, [cartItem, customizations]);

  const handleIncrement = () => {
    setCartItem((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        quantity: prev.quantity + 1
      }
    });
  }

  const handleDecrement = () => {
    if (cartItem?.quantity == 1) return;

    setCartItem((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        quantity: prev.quantity - 1
      }
    });
  }

  const hasCustomization = (extra: Extra): boolean => {
    return customizations.find(c => c.name === extra.name) !== undefined; 
  }

  const handleAddCustomiztion = (extra: Extra, type: string) => {
    console.log('Adding customization:', extra.name, 'Price:', extra.price, 'Current itemPrice:', itemPrice);
    
    if (hasCustomization(extra)) {
      console.log('Customization already exists:', extra.name);
      return;
    }

    const newCusomization = {
      id: extra.name,
      name: extra.name,
      price: extra.price,
      type
    };

    setCustomizations((prev) => {
      const newCustomizations = [...prev, newCusomization];
      console.log('Updated customizations:', newCustomizations);
      return newCustomizations;
    });
  };

  const handleRemoveCustomization = (extra: Extra) => {
    console.log('Removing customization:', extra.name, 'Price:', extra.price, 'Current itemPrice:', itemPrice);
    
    setCustomizations((prev) => {
      const newCustomizations = prev.filter(c => c.name !== extra.name);
      console.log('Updated customizations:', newCustomizations);
      return newCustomizations;
    });
  };

  const handleAddToCart = () => {
    if (!cartItem) return;

    const itemToAdd = cartItem;
    itemToAdd.customizations = customizations;

    addItem(itemToAdd);
  }

  
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
            renderItem={({ item }) => <ExtraItem extra={item} type='topping' addCustomization={handleAddCustomiztion} removeCustomization={handleRemoveCustomization} isSelected={hasCustomization(item)}/>}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 20 }}
            style={{ height: 150 }}
            contentContainerClassName='my-3'
          />
        </View>
        <View className='pl-6 mt-6'>
          <Text className='base-semibold'>Side options</Text>
          {/*customizations.length > 0 && (
            <View className='mt-4 p-4 bg-gray-100 rounded-lg'>
              <Text className='base-medium mb-2'>Selected Customizations:</Text>
              {customizations.map((customization, index) => (
                <Text key={index} className='paragraph-medium text-gray-600'>
                  • {customization.name} (+${customization.price})
                </Text>
              ))}
              <Text className='base-semibold mt-2'>Total Price: ${itemPrice.toFixed(2)}</Text>
            </View>
          )*/}
          <FlatList
            data={sides}
            renderItem={({ item }) => <ExtraItem extra={item} type='side' addCustomization={handleAddCustomiztion} removeCustomization={handleRemoveCustomization} isSelected={hasCustomization(item)}/>}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10, gap: 20 }}
            style={{ height: 150 }}
            contentContainerClassName='my-3'
          />
        </View>
        <View className='flex flex-row justify-between items-center bg-white w-[85%] mx-auto rounded-3xl shadow-lg mt-10 p-4'>
          <View className='flex flex-row justify-between gap-3'>
            <TouchableOpacity onPress={handleDecrement} className='bg-primary/5 p-2'>
              <Image source={images.minus} className='size-5' resizeMode='contain'/>
            </TouchableOpacity>
            <Text className='base-semibold'>{cartItem?.quantity || 1}</Text>
            <TouchableOpacity onPress={handleIncrement} className='bg-primary/5 p-2'>
              <Image source={images.plus} className='size-5' resizeMode='contain'/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className='bg-primary p-4 rounded-3xl' onPress={handleAddToCart}>
            <View className='flex flex-row gap-2 items-center'>
              <Image source={images.bag} className='size-4' resizeMode='contain'/>
              <Text className='paragraph-medium text-white'>Add to cart (${itemPrice.toFixed(2)})</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MenuItemScreen