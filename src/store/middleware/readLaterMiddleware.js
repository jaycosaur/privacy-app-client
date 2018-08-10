import { db } from './../../config/firebase'
import moment from 'moment'

export function subscribeToReadLaterList() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_READ_LATER_LIST') {
            const state = getState()
            const uid = state.user.user.uid
            const ref = db.collection('readlaterlists').doc(uid)
            dispatch({
                type: "SUBSCRIBE_TO_READ_LATER_LIST"
            })
            ref.onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data()
                    dispatch({
                        type: "UPDATE_TO_READ_LATER_LIST",
                        payload: data
                    })
                } else {
                    dispatch({
                        type: "CREATE_READ_LATER_LIST",
                        payload: ref.set({items: [], createdOn: moment().toISOString()})
                    })
                }
            })
        }
        return next(action)
    }
}

export function addToReadLaterList() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'ADD_TO_READ_LATER_LIST') {
            const state = getState()
            const uid = state.user.user.uid
            const ref = db.collection('readlaterlists').doc(uid)
            if (action.payload) {
                dispatch({
                    type: "ADD_TO_READ_LATER_LIST",meta: action.payload, payload: db.runTransaction((transaction) => {
                        return transaction.get(ref).then((doc) => {
                            let newItems = []
                            if (doc.exists){
                                if (doc.data().items.map(i=>i.id).indexOf(action.payload)>-1){
                                    throw "Id already in read later list!"
                                }
                                newItems = [...doc.data().items, {id: action.payload, addedOn: moment().toISOString()}];
                            } else {
                                newItems = [action.payload]
                            }
                            transaction.update(ref, { items: newItems, lastUpdated: moment().toISOString() });
                        });
                    })
                })
            }
        }
        return next(action)
    }
}

export function getItemInReadLaterList() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_ITEM_IN_READ_LATER_LIST') {
            const state = getState()
            const uid = state.user.user.uid
            const ref = db.collection('base-items').doc(action.payload)
            dispatch({
                type: "GET_ITEM_IN_READ_LATER_LIST",
                payload: ref.get().then(doc => {
                        const data = doc.data()
                        return data
                    }),
                meta: action.payload
            })
        }
        return next(action)
    }
}

export function removeFromReadLaterList() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'REMOVE_FROM_READ_LATER_LIST') {
            const state = getState()
            const uid = state.user.user.uid
            const ref = db.collection('readlaterlists').doc(uid)
            if (action.payload) {
                dispatch({
                    type: "REMOVE_FROM_READ_LATER_LIST",meta: action.payload, payload: db.runTransaction((transaction) => {
                        return transaction.get(ref).then((doc) => {
                            if (doc.exists){
                                if (doc.data().items.map(i=>i.id).indexOf(action.payload)===-1){
                                    throw "Id is not in your read later list so cannot remove!"
                                }
                                const newItems = doc.data().items.filter(i=>i.id!==action.payload);
                                transaction.update(ref, { items: newItems, lastUpdated: moment().toISOString() })
                            }
                        });
                    })
                })
            }
        }
        return next(action)
    }
}