//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { SIZES, COLORS, FONTS, icons } from '../constants'

// create a component
const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return (
        <View style={{ ...containerStyle }}>
            {/* Title */}
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>{title}</Text>
            {/* Figures */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',

            }}>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>$</Text>
                <Text style={{ marginLeft: SIZES.base, ...FONTS.h2, color: COLORS.white }}>{displayAmount.toLocaleString()}</Text>
                <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>USD</Text>
            </View>
            {/* Change percentage */}
            <View style={{
                flexDirection: 'row', alignItems: 'flex-end'
            }}>
                {changePct != 0 && <Image
                    source={icons.upArrow}
                    style={{
                        width: 10, height: 10, alignSelf: 'center',
                        tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
                        transform: changePct > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                    }}
                />
                }

                <Text style={{
                    marginLeft: SIZES.base, alignSelf: 'flex-end',
                    color: (changePct > 0) ? COLORS.lightGray3 : COLORS.red, ...FONTS.h4
                }}>
                    {changePct.toFixed(2)}%
                </Text>

                <Text style={{
                    marginLeft: SIZES.radius,
                    alignSelf: 'flex-end',
                    color: COLORS.lightGray3, ...FONTS.h5
                }}>
                    7d change
                </Text>

            </View>

        </View>
    );
};



//make this component available to the app
export default BalanceInfo;
