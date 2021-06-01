//import liraries
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { FONTS, COLORS } from '../constants'

// create a component
const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {

    if (isTrade) {
        return <View style={{
            alignItems: 'center', justifyContent: 'center',
            width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.black
        }}>
            <Image source={icon}
                resizeMode='contain'
                style={{ width: 25, height: 25, tintColor: COLORS.white, ...iconStyle }}
            />
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Trade</Text>
        </View>
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 25, height: 25, tintColor: focused ? COLORS.white : COLORS.secondary,
                    ...iconStyle
                }}
            />
            <Text style={{ color: focused ? COLORS.white : COLORS.secondary, ...FONTS.h4 }}>
                {label}
            </Text>
        </View>
    );
};


//make this component available to the app
export default TabIcon;
