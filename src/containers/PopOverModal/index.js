import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/popoverModalActions'
import UserInfoModal from './modalTypes/UserInfoModal'
import ChangePassword from './modalTypes/ChangePassword'
import NotificationSettings from './modalTypes/NotificationSettings'

import CreateWatchModal from './modalTypes/CreateWatchModal'

const PopOverModal = (props) => {
  switch(props.selectedModal){
    case "create-watch":
      return <CreateWatchModal {...props} />
    case "password":
      return <ChangePassword {...props} />
    case "userinfo":
      return <UserInfoModal {...props} />
    case "notification":
      return <NotificationSettings {...props}/>
    default:
      return null
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isShowing: state.popover.isShowing,
        selectedModal: state.popover.selectedModal
    }
}

export default connect(mapStateToProps, actions)(PopOverModal)