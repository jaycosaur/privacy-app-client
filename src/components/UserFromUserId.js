import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    return {
        teamMembers: state.organisation.users
    }
}
export default connect(mapStateToProps)