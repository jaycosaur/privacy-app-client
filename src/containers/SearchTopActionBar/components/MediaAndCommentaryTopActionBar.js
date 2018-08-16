import * as actions from './../../../store/actions/newsActions'
import { connect } from 'react-redux'

const ActionCreator = (props) => {        
      return null
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.news.searchTags,
    isSaving: state.news.isSaving,
    isUnsaved: state.news.isUnsaved,
    isFetching: state.news.isFetching,
    isFetchingRss: state.news.isFetchingRss,
    rssItems: state.news.rssItems
  }
}

export const TopBarActions = connect(mapStateToProps, actions)(ActionCreator)
export const topBarTitle = ["Media & Commentary"]