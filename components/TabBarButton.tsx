import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { icons } from '@/assets/icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const TabBarButton = (props: any) => {
    const { isFocused, routeName, label, color } = props

    const scale = useSharedValue(0)

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 })
    }, [isFocused, scale])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
        const top = interpolate(scale.value, [0, 1], [0, 8])
        return {
            transform: [{ scale: scaleValue }],
            top
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return {
            opacity
        }
    })

    return (
        <Pressable style={styles.container} {...props}>
            <Animated.View style={[animatedIconStyle]}>
                {
                    icons[routeName]({ color })
                }
            </Animated.View>
            <Animated.Text style={[{ color, fontSize: 11 }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )
}

export default TabBarButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})