import algoliasearch from 'algoliasearch'

var client = algoliasearch('FEQZM17GZV', '0f26c164ae44f21a6bfffa4941e6ec99')

var legislationIndex = client.initIndex('legislation')
var newsIndex = client.initIndex('news')

export const submitSearchNews = ({query, filters}) => {
    return {
        type: 'SEARCH_NEWS',
        payload: newsIndex.search({query: query})
    }
}