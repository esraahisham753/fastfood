import useAuthStore from '@/store/auth.store';
import {Redirect, Slot, Tabs} from 'expo-router';
import {TabBarIconProps} from "@/type";
import {View, Image, Text} from "react-native";
import cn from "clsx";
import {images} from "@/constants";

const TabBarIcon = ({focused, title, icon}: TabBarIconProps) => (
    <View className="tab-icon">
        <Image source={icon} resizeMode="cover" className="size-7" tintColor={focused ? '#FE8C00' : '#181C2EB2'}/>
        <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>{title}</Text>
    </View>
)

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={"/signin"} />
  
  return (
    <Tabs
        screenOptions={
            {
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    position: 'absolute',
                    bottom: 40,
                    borderTopLeftRadius: 70,
                    borderTopRightRadius: 70,
                    borderBottomLeftRadius: 70,
                    borderBottomRightRadius: 70,
                    shadowColor: '#1a1a1a',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: '#fff',
                    marginHorizontal: 20
                }
            }
        }
    >
        <Tabs.Screen
            name="index"
            options={{
                tabBarIcon: ({ focused }) => (<TabBarIcon icon={images.home} focused={focused} title="Home"/>),
                title: 'Home'
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                tabBarIcon: ({ focused }) => (<TabBarIcon icon={images.search} focused={focused} title="Search"/>),
                title: 'Search'
            }}
        />
        <Tabs.Screen
            name="carttab"
            options={{
                tabBarIcon: ({ focused }) => (<TabBarIcon icon={images.bag} focused={focused} title="Cart"/>),
                title: 'Cart'
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                tabBarIcon: ({ focused }) => (<TabBarIcon icon={images.person} focused={focused} title="Profile"/>),
                title: 'Profile'
            }}
        />
    </Tabs>
  )
}