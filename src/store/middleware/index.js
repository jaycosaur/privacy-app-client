import { auth, db } from './../../config/firebase'
import { push } from 'connected-react-router'
//actions
import * as teamActions from './../actions/teamActions'

export function sendVerificationEmail(){
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SEND_USER_VERIFICATION_EMAIL') {
            dispatch({
                type: "SEND_USER_VERIFICATION_EMAIL",
                payload: auth.currentUser.sendEmailVerification()
            })
        }
        return next(action)
    }
}

export function afterOrganisationalInfoFulfilled(){
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ORGANISATION_FULL_INFO_FadfULFILLED') {
        }
        return next(action)
    }
}

export function onSignIn() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'USER_HAS_SIGNED_IN') {
            dispatch({ type: "GET_ACCOUNT_INFORMATION" })
            dispatch({ type: "GET_READ_LATER_LIST" })
        }
        return next(action)
    }
}

export function createPolicyWatchMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_POLICY_WATCH') {
            const state = getState()
            const watchObject = {
                uid: state.user.user.uid,
                created: Date.now(),
                keywords: state.filter.keywordInput,
                title: state.popover.selectedModalFields.watchAlertTitle,
                alertFrequency: state.popover.selectedModalFields.watchAlertFrequency,
                filters: state.filter.filters,
                watchedItemIds: [1, 2, 3, 4, 5, 6, 7]
            }
            return dispatch({ type: "CREATE_POLICY_WATCH", payload: db.collection("watchlists").doc(state.user.user.uid).collection('watchlists').add(watchObject) })
        }
        return next(action)
    }
}

export function getWatchlistItems() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'FETCH_WATCHLIST_ITEMS') {
            const state = getState()
            const watchlistRef = db.collection("watchlists").doc(state.user.user.uid).collection('watchlists')
            const watchlistItemArray = []
            dispatch({
                type: "FETCH_WATCHLIST_ITEMS", payload: watchlistRef.get().then(res => {
                    res.forEach(doc => watchlistItemArray.push({ id: doc.id, ...doc.data() }))
                    return watchlistItemArray
                })
            })
        }
        return next(action)
    }
}

export function getWatchlistItem() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'FETCH_WATCHLIST_ITEM') {
            const state = getState()
            const watchlistRef = db.collection("watchlists").doc(state.user.user.uid).collection('watchlists').doc(action.meta)
            dispatch({
                type: "FETCH_WATCHLIST_ITEM",
                payload: watchlistRef.get().then(res => res.data()),
                meta: action.meta
            })
        }
        return next(action)
    }
}

export function deleteWatchlistItem() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'DELETE_WATCHLIST_ITEM') {
            const state = getState()
            const watchlistItemRef = db.collection("watchlists").doc(state.user.user.uid).collection('watchlists').doc(action.meta)
            dispatch({ type: "DELETE_WATCHLIST_ITEM", payload: watchlistItemRef.delete(), meta: action.meta })
        }
        return next(action)
    }
}

export function saveNewsSettingMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SAVE_NEWS_SETTINGS') {
            const state = getState()
            const newsObject = {
                uid: state.user.user.uid,
                lastUpdate: Date.now(),
                searchTags: state.news.searchTags,
                receiveEmailAlerts: false
            }
            dispatch({ type: "SAVE_NEWS_SETTINGS", payload: db.collection("newsalerts").doc(state.user.user.uid).set(newsObject) })
        }
        return next(action)
    }
}

export function getNewsSettingItems() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'FETCH_NEWS_SETTINGS') {
            const state = getState()
            const newsSettingsRef = db.collection("newsalerts").doc(state.user.user.uid)
            dispatch({
                type: "FETCH_NEWS_SETTINGS", payload: newsSettingsRef.get().then(res => {
                    return res.data()
                })
            })
        }
        return next(action)
    }
}

export function getAccountInformation() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ACCOUNT_INFORMATION') {
            const state = getState()
            const accountRef = db.collection("users").doc(state.user.user.uid)
            accountRef.onSnapshot(function(doc) {
                dispatch({
                    type: "GET_ACCOUNT_INFORMATION_FULFILLED", payload: doc.data()
                })
            })
        }
        return next(action)
    }
}

export function getAccountInformationAfterUpdate() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'UPDATE_ACCOUNT_INFORMATION_FULFILLED') {
            const state = getState()
            const accountRef = db.collection("users").doc(state.user.user.uid)
            dispatch({
                type: "GET_ACCOUNT_INFORMATION", payload: accountRef.get().then(res => {
                    return res.data()
                })
            })
        }
        return next(action)
    }
}

export function getOrganisationAfterAccountLoaded() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ACCOUNT_INFORMATION_FULFILLED') {
            const hasAccount = action.payload
            if (hasAccount){
                const organisationId = action.payload.organisationId
                if (organisationId){
                    dispatch(teamActions.getOrganisationInformation({ organisationId }))
                } else {
                    dispatch({
                        type: "USER_HAS_NO_ORGANISATION"
                    })
                }
            }
            else {
                dispatch({
                    type: "USER_HAS_NO_ACCOUNT"
                })
                dispatch({
                    type: "USER_HAS_NO_ORGANISATION"
                })
            }
        }
        return next(action)
    }
}

/* export function userHasNoAccountRedirect() {
    return ({ dispatch, getState }) => next => action => {
        const state = getState()
        const isInvite = state.router.location.pathname==="/invite"
        if (action.type === 'USER_HAS_NO_ORGANISATION') {
            dispatch({type: "SHOW_FULL_SCREEN"})
            if(!isInvite){
                dispatch(push("/no-organisation"))
            }
        }
        return next(action)
    }
} */

export function createdNewTeamRedirect() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'CREATE_NEW_TEAM_FROM_FIELDS_FULFILLED') {
            dispatch(push("/invite-users"))
        }
        return next(action)
    }
}

export function workspaceRedirect() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'REDIRECT_TO_WORKSPACE') {
            dispatch({type: "HIDE_FULL_SCREEN"})
            dispatch(push("/compliance-workspace"))
        }
        return next(action)
    }
}

export function flushReduxStoreOnSignout() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'SIGNOUT_USER_FULFILLED') {
            dispatch({
                type: "RESET_STATE_TO_DEFAULT"
            })
        }
        return next(action)
    }
}

