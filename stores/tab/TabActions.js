export const SET_TRADE_MODAL_VISIBILITY = 'SET_TRADE_MODAL_VISIBILITY'

export const setTradeVisibilitySuccess = isVisible => ({
    type: SET_TRADE_MODAL_VISIBILITY,
    payload: { isVisible }
})

export function setTradeModalVisibility(isVisible) {
    return dispatch => {
        dispatch(setTradeVisibilitySuccess(isVisible))
    }
}