import { connect } from 'react-redux'

const UserNameOrEmail = (props) => {
    const indexOfUserId = props.users.map(i=>i.userId).indexOf(props.userId)
    const userNameMatch = indexOfUserId>-1?props.users[indexOfUserId]:null
    const returnValue = userNameMatch.displayName || userNameMatch.email
  return returnValue || "User Not Found"
}

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.organisation.users
    }
}

export default connect(mapStateToProps)(UserNameOrEmail)