import Feed from 'rss-to-json'

export const handleTagChange = (payload) => {
    return {
        type: 'HANDLE_TAG_CHANGE',
        payload: payload
    }
}

export const saveNewsSettings = (payload) => {
    return {
        type: 'SAVE_NEWS_SETTINGS',
    }
}

export const fetchNewsSettings = (payload) => {
    return {
        type: 'FETCH_NEWS_SETTINGS',
    } 
}

export const fetchNewsViaRSS = () => {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    return {
        type: 'FETCH_NEWS_RSS',
        payload: new Promise((resolve, reject)=>{
            try {
                Feed.load(CORS_PROXY+'https://www.canberratimes.com.au/rss/politics/federal.xml', function(err, rss){
                    resolve(rss.items)
                })
            } catch(err) {
                reject(err)
            }
        })}
}

export const fetchNewsViaAlgolia = () => {
    return {
        type: 'FETCH_NEWS_ITEMS',
        payload: "Trump"
}}