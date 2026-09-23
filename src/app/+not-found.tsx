import React from 'react'
import { useRouter } from 'expo-router'
import { useThemeContext } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'

const NotFound = () => {
  const router = useRouter()
  const { theme } = useThemeContext()

  return (
    <Screen style={{ justifyContent: 'center' }}>
      <Stack gap="xl" align="center">
        <Stack gap="sm" align="center">
          <Text variant="title" style={{ fontSize: 96, color: theme.colors.border, lineHeight: 96 }}>
            404
          </Text>
          <Text variant="title">Page Not Found</Text>
          <Text variant="body" style={{ textAlign: 'center' }}>
            The page you are looking for might have been moved, deleted, or doesn't exist.
          </Text>
        </Stack>
        <Button onPress={() => router.replace("/")}>Go to Home</Button>
      </Stack>
    </Screen>
  )
}

export default NotFound
