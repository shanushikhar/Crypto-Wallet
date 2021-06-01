//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants'

// create a component
const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            height: 50, borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            ...containerStyle
        }}
            onPress={onPress}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{ width: 20, height: 20 }}
            />
            <Text style={{
                marginLeft: SIZES.base,
                ...FONTS.h3
            }}>{label}</Text>
        </TouchableOpacity>
    );
};


//make this component available to the app
export default IconTextButton;
