import React from 'react';
import { View, Animated, StatusBar } from 'react-native';
import { connect } from 'react-redux'

import { IconTexButton } from '../components';
import { COLORS, SIZES, icons } from '../constants'

const MainLayout = ({ children, isTradeModalVisible }) => {

    const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (isTradeModalVisible) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }, [isTradeModalVisible])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 300]
    })

    return (
        <View style={{
            flex: 1
        }}>
            <StatusBar translucent backgroundColor='transparent' />
            {children}

            {/* Dim the background */}
            {
                isTradeModalVisible &&
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0, left: 0, right: 0,
                        backgroundColor: COLORS.transparentBlack
                    }}
                    opacity={modalAnimatedValue}
                />
            }

            {/* Modal by Animation */}
            <Animated.View
                style={{
                    position: 'absolute',
                    top: modalY,
                    left: 0, width: '100%',
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary // can make it red...
                }}
            >
                <IconTexButton
                    label='Transfer'
                    icon={icons.send}
                    onPress={() => console.log('Transfer...')}
                />
                <IconTexButton
                    label='Withdraw'
                    icon={icons.withdraw}
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    onPress={() => console.log('Withdraw...')}
                />
            </Animated.View>


        </View>
    )
}

function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
