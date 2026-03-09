import React from "react"
import { Animated, Text, TextInput, View } from "react-native"
import { txtfield_styles } from "./textfield_styles"

type Props = {

    label: string
    value: string
    placeholder: string
    secure?: boolean
    keyboardType?: any

    scale: Animated.Value

    onChange: (v: string) => void
    onFocus: () => void
    onBlur: () => void
}

export default function AppTextField({

    label,
    value,
    placeholder,
    secure,
    keyboardType,
    scale,
    onChange,
    onFocus,
    onBlur

}: Props) {

    return (

        <View style={txtfield_styles.formBlock}>

            <Text style={txtfield_styles.label}>{label}</Text>

            <Animated.View style={{ transform: [{ scale }] }}>

                <TextInput
                    value={value}
                    onChangeText={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    secureTextEntry={secure}
                    keyboardType={keyboardType}
                    style={txtfield_styles.input}
                />

            </Animated.View>

        </View>

    )
}