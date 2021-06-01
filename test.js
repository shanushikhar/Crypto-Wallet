//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image, ImageBackground, StatusBar, ScrollView } from 'react-native';

// create a component
const Tesst = () => {
    //const { width: windowWidth, height: windowHeight } = useWindowDimensions()
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    return (
        <>
            {/* <StatusBar backgroundColor='rgba(0,0,0,0.7)' barStyle='default' /> */}
            <StatusBar translucent backgroundColor='transparent' />
            <ScrollView>
                <View style={{ width: windowWidth, height: windowHeight }}>
                    <ImageBackground style={{ flex: 1 }}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV3XWHYRoyXTFb757c2YSDjeUMq8DlFlrXng&usqp=CAU' }} />
                </View>
            </ScrollView>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Tesst;
