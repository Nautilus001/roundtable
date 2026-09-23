import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useThemeContext } from '@/hooks/use-theme'
import { Theme } from '@/constants/theme'

interface CountdownWidgetProps {
    time: Date
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({time}) => {  
    const { theme } = useThemeContext()
    const styles = useMemo(() => createStyles(theme), [theme])
    const targetDate = new Date(time)
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const difference = targetDate.getTime() - Date.now()
        
        if (difference <= 0) {
            return { days: '00', hours: '00', minutes: '00', seconds: '00' }
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    const renderDigitGroup = (timeValue: string) => {
        return (
            <View style={styles.groupContainer}>
                {timeValue.split('').map((digit, index) => (
                    <View key={index} style={styles.digitRectangle}>
                        <Text style={styles.digitText}>{digit}</Text>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <View style={styles.eventTile}>
            <View style={styles.countdownContainer}>
                {renderDigitGroup(timeLeft.days)}
                <Text style={styles.colon}>:</Text>
                
                {renderDigitGroup(timeLeft.hours)}
                <Text style={styles.colon}>:</Text>
                
                {renderDigitGroup(timeLeft.minutes)}
                <Text style={styles.colon}>:</Text>
                
                {renderDigitGroup(timeLeft.seconds)}
            </View>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Days</Text>
                <Text style={styles.label}>Hrs</Text>
                <Text style={styles.label}>Min</Text>
                <Text style={styles.label}>Sec</Text>
            </View>
        </View>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    eventTile: {
        backgroundColor: theme.colors.accent,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: theme.colors.textPrimary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    countdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupContainer: {
        flexDirection: 'row',
    },
    digitRectangle: {
        backgroundColor: theme.colors.action,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.md,
        marginHorizontal: 2,
        minWidth: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.secondary,
    },
    digitText: {
        color: theme.colors.onAction,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    colon: {
        color: theme.colors.onAction,
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: theme.spacing.xs,
        paddingBottom: theme.spacing.xs, 
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: theme.spacing.xs,
        marginTop: theme.spacing.xs,
    },
    label: {
        color: theme.colors.primary,
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center',
        width: 60, 
    },
})

export default CountdownWidget
