import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useRef} from 'react'
import {ToastConfig} from '@/models/toast'
import {SafeAreaView} from 'react-native-safe-area-context'

const GlobalToast = (toast: ToastConfig) => {
    const slideAnim = useRef(new Animated.Value(-100)).current
    const buffer = toast.timeout * 0.10

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
        }).start()

        const timer = setTimeout(() => {
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true
            }).start()
            }, toast.timeout - buffer)

        return () => clearTimeout(timer)
    },[slideAnim])

    const getBackgroundColor = () => {
        switch (toast.severity) {
        case 0:
            return '#34C759'
        case 1:
            return '#FF3B30'
        case 2:
            return '#ff9100'
        case 3:
            return '#fff200'
        default:
            return '#007AFF'
        }
    };


    return (
        <SafeAreaView style={styles.container} pointerEvents="box-none">
            <Animated.View
                style={[
                styles.toastCard,
                {
                    backgroundColor: getBackgroundColor(),
                    transform: [{ translateY: slideAnim }], // Bind the animation
                },
                ]}
            >
                <View style={styles.contentWrapper}>
                    <Text style={styles.messageText} numberOfLines={2}>
                        {toast.severity === 1 ? '⚠️  ' : toast.severity === 0 ? '✅  ' : 'ℹ️  '}
                        {toast.message}
                    </Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

export default GlobalToast

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 9999, // Ensure it sits on top of everything else
    alignItems: 'center',
  },
  toastCard: {
    width: '90%',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 6,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});