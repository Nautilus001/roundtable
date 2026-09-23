import React from 'react'
import { Tabs } from 'expo-router'
import { useAuthContext } from '@/hooks/use-auth-context'
import { useThemeContext } from '@/hooks/use-theme'
import Ionicons from '@react-native-vector-icons/ionicons'

const TabsLayout = () => {
    const { claims } = useAuthContext()
    const { theme } = useThemeContext()
    return (
        <Tabs 
            initialRouteName='(dashboard)'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                },
                tabBarActiveTintColor: theme.colors.action,
                tabBarInactiveTintColor: theme.colors.textSecondary,
            }}
        >
            <Tabs.Protected guard={!!claims}>
                <Tabs.Screen 
                    name="(gathering-mgmt)"
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Ionicons
                                    name="calendar"
                                    size={24}
                                    color={tabInfo.color}
                                />
                            )
                        },
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name="(dashboard)"
                    options={{
                        tabBarIcon: (tabInfo) => {
                            return (
                                <Ionicons
                                    name="home"
                                    size={24}
                                    color={tabInfo.color}
                                />
                            )
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
                                    color={tabInfo.color}
                                />
                            )
                        },
                        headerShown: false
                    }}
                />
            </Tabs.Protected>
        </Tabs>
    )
    }

export default TabsLayout
