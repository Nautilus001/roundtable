import { useAuthContext } from "@/hooks/use-auth-context";
import { useThemeContext } from "@/hooks/use-theme";
import { Stack, Tabs } from "expo-router";

function CrudNavigator() {
    const { claims } = useAuthContext()
    return (
        <Tabs initialRouteName="items" screenOptions={{headerShown: false}}>
            <Tabs.Protected guard={!!claims}>
                <Tabs.Screen name="items" />
                <Tabs.Screen name="categories" />
                <Tabs.Screen name="gatherings"/>
                <Tabs.Screen name="scales"/>
                <Tabs.Screen name="votes"/>
            </Tabs.Protected>
        </Tabs>
    )
}