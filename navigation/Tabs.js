import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tabs = () => {

    const Tab = createBottomTabNavigator();

    const defaultOptions = ({navigation}) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarIconStyle: {},
    })

    return (
        <Tab.Navigator
            screenOptions={defaultOptions}
            >
            <Tab.Screen
                name="Service Log"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="car-wrench" color={color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs