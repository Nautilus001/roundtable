import { StyleSheet} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { useAuthContext } from '@/hooks/use-auth-context'
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
    const { claims } = useAuthContext()
    return (
        <Tabs screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tabs.Protected guard={!!claims}>
                <Tabs.Screen 
                    name="index" 
                    options={{ href: null }} 
                />
                <Tabs.Screen 
                    name="create-event"
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Ionicons
                                    name="calendar"
                                    size={24}
                                    color={tabInfo.focused ? "#006600" : "#8e8e93"}
                                />
                            );
                        },
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="dashboard"
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Ionicons
                                    name="home"
                                    size={24}
                                    color={tabInfo.focused ? "#006600" : "#8e8e93"}
                                />
                            );
                        },
                        headerShown: false
                    }}
                />
                <Tabs.Screen 
                name="account" 
                options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Ionicons
                                    name="person"
                                    size={24}
                                    color={tabInfo.focused ? "#006600" : "#8e8e93"}
                                />
                            );
                        },
                        headerShown: false
                    }}
                />
            </Tabs.Protected>
        </Tabs>
    )
    }

export default TabsLayout

const styles = StyleSheet.create({})