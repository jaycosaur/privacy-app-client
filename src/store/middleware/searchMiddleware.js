import { db } from './../../config/firebase'
import algoliasearch from 'algoliasearch'

const client = algoliasearch('FEQZM17GZV', '0f26c164ae44f21a6bfffa4941e6ec99')
const newsIndex = client.initIndex('news')
const mainBaseIndex = client.initIndex('main_base')

export function searchMiddleware() {
    return ({ dispatch, getState }) => next => action => {
        if (action.type === 'GET_SEARCH') {
            const { type, query='', attrs, page=0, filters=null, hitsPerPage=25 } = action.payload
            const state = getState()
            const { searchFilter='', ranking } = state.filter
            let index = null
            switch(type){
                case 'REGULATION':
                    index = newsIndex
                    break
                case 'MEDIA':
                    index = newsIndex
                    break
                case 'RESEARCH':
                    index = newsIndex
                    break
                default:
                    index = mainBaseIndex
            }
            // needs the creation of replica indexes to achieve this
            if (false&&ranking.orderBy){
                index.setSettings({
                    customRanking: [
                        `${ranking.order}(${ranking.orderBy})`
                    ]
                })
            }

            let searchPayload = { query: query || searchFilter || "", ...attrs, page, hitsPerPage }

            if (filters){
                searchPayload = {...searchPayload, filters}
            }

            dispatch({
                type: "FETCH_ALGOLIA_RESULTS", 
                payload: index.search(searchPayload),
                meta: { ...action.payload, append: page!==0 }
            })
        }
        if (action.type === 'SEARCH_FOR_FACET_VALUES') {
            const { facet } = action.payload
            dispatch({
                type: "FETCH_FACET_VALUES", 
                payload: mainBaseIndex.searchForFacetValues({
                    facetName: facet,
                    facetQuery: ''
                }),
                meta: { ...action.payload }
            })
        }
        if (action.type === 'FETCH_ALGOLIA_RESULTS_FULFILLED') {
            if (action.meta.saveSearch){
                const state = getState()
                const { filters, query, type } = action.meta
                const userSearchRef = db.collection("users").doc(state.user.user.uid).collection("recentSearches")
                const searchObject = {
                    whenSearch: Date.now(),
                    query: query,
                    type: type,
                    filters: filters
                }
                dispatch({
                    type: "SAVE_NEW_SEARCH", payload: userSearchRef.add(searchObject)
                })
            }
        }

        return next(action)
    }
}