import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { MainLayout } from '.';
import { getHoldings, getCoinMarket } from '../stores/market/marketAction';
import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants'
import { BalanceInfo, IconTexButton, Chart } from '../components';

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {

    const [selectedCoin, setSelectedCoin] = React.useState(null)

    useFocusEffect(
        React.useCallback(() => {
            getHoldings(holdings = dummyData.holdings)
            getCoinMarket()
        }, [])
    )

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0)
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
    let percChange = valueChange / (totalWallet - valueChange) * 100

    function renderWalletInfoSection() {
        return (
            <View style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}>
                {/* Balance info */}
                <BalanceInfo
                    title='Your Wallet'
                    displayAmount={totalWallet}
                    changePct={percChange}
                    containerStyle={{
                        marginTop: 50
                    }}
                />

                {/* Buttons */}
                <View style={{
                    flexDirection: 'row', marginTop: 30, marginBottom: -15, paddingHorizontal: SIZES.radius
                }}>
                    <IconTexButton
                        label='Transfer'
                        icon={icons.send}
                        containerStyle={{
                            flex: 1, height: 40, marginRight: SIZES.radius
                        }}
                        onPress={() => console.log('transfer...')}
                    />
                    <IconTexButton
                        label='Withdraw'
                        icon={icons.withdraw}
                        containerStyle={{
                            flex: 1, height: 40,
                        }}
                        onPress={() => console.log('Withdraw...')}
                    />
                </View>


            </View>
        )
    }

    // console.log('hey...')

    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* Header wallet info */}
                {renderWalletInfoSection()}
                {/* Chart */}
                <Chart
                    containerStyle={{
                        marginTop: SIZES.padding * 2
                    }}
                    chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
                />

                {/* Top Cryptocurrency */}
                <FlatList
                    data={coins}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: 30,
                        paddingHorizontal: SIZES.padding
                    }}
                    ListHeaderComponent={
                        <View style={{ marginBottom: SIZES.radius }}>
                            <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>Top Cryptocurrency</Text>
                        </View>
                    }
                    renderItem={({ item }) => {
                        let priceColor = (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (item.
                            price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red

                        return (
                            <TouchableOpacity
                                onPress={() => setSelectedCoin(item)}
                                style={{ height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Logo */}
                                <View style={{
                                    width: 35
                                }}>
                                    <Image style={{ height: 20, width: 20 }} source={{ uri: item.image }} />
                                </View>
                                {/* Names */}
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.name}</Text>
                                </View>
                                {/* Figures */}
                                <View>
                                    <Text style={{ textAlign: 'right', color: COLORS.white }}>
                                        $ {item.current_price}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            item.price_change_percentage_7d_in_currency != 0 && <Image
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10, width: 10, tintColor: priceColor,
                                                    transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
                                                }}
                                            />
                                        }
                                        <Text style={{ marginLeft: 5, color: priceColor, ...FONTS.body5, lineHeight: 15 }}>
                                            {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                    }}
                    ListFooterComponent={
                        <View
                            style={{ marginBottom: 50 }}
                        />
                    }
                />
            </View>
        </MainLayout>
    )
}

function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings: (holdings, currency, coinList, orderBy, sparkline,
            priceChangePerc, perPage, page) => {
            return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline,
                priceChangePerc, perPage, page))
        },
        getCoinMarket: (currency, coinList, orderBy, sparkline,
            priceChangePerc, perPage, page) => {
            return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline,
                priceChangePerc, perPage, page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
