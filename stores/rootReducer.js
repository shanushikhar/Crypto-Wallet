import {combineReducers,} from 'redux'
import marketReducer from './market/marketReducer'
import tabReducer from './tab/TabReducer'

export default combineReducers({
    tabReducer,
    marketReducer
})
