import { functions } from './../../config/firebase'

export const summariseNews = ({ body, numberOfSentences }) => {
    return {
        type: 'ML_NEWS_SUMMARISE',
        payload: functions.httpsCallable('summariseNewsArticle')({ body, numberOfSentences }).then((res) => res.data)
    }
}

export const autotagFromTitle = ({title}) => {
    return {
        type: 'ML_AUTO_TAG_FROM_TITLE',
        payload: functions.httpsCallable('tagLegislationCategories')({title}).then((res) => res.data)
    }
}

export const isNewsSpam = ({ title }) => {
    return {
        type: 'ML_IS_NEWS_SPAM',
        payload: functions.httpsCallable('isSpamNewsArticle')({ title }).then((res) => res.data)
    }
}