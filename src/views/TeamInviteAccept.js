import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as teamActions from './../store/actions/teamActions'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FullPageLoader from './../components/FullPageLoader'
import qs from 'qs'

class TeamInviteAccept extends Component {
    // take token
    // send to api
    // api gets email of user who requested
    // api retrieves object from key of database
        // gets email from object
        // gets organisationId from object
    // checks email against email of request
        // if match updates users profile to incorporate organisation id and updates organisation with userId, redirects to home page
        // if no match rejects and redirects to home page
    componentDidUpdate() {
        if(this.props.organisation.hasJoinedOrganisation){
            this.props.getOrganisationInformation({ organisationId: this.props.organisation.organisationId})
            this.props.hideFullScreen()
            this.props.history.push('/invite-accepted')
        }
    }
    render() {
        const { organisation: { isJoiningOrganisation, hasJoinedOrganisation, organisationJoinRejected, rejectionMessage} } = this.props
        const { id } = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        const invitetoken = id
        return (
            <div style={{width: "100%", height: "95vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#623aa2", flexDirection: "column"}}>
                {!organisationJoinRejected?((isJoiningOrganisation||hasJoinedOrganisation)?[<FullPageLoader />,<Typography variant="subheading" align="center" gutterBottom style={{color: "white", marginTop: 16}}>Just cutting your key...</Typography> ]
                    :<div style={{maxWidth: 500, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingBottom: 100}}>
                        <Typography variant="display3" align="center" gutterBottom style={{color: "white"}}>You have been invited to a team!</Typography>
                        <Button 
                            onClick={()=>this.props.signUpToOrganisationViaToken({ invitetoken })}
                            variant="extendedFab" 
                            color="secondary" 
                            style={{color: "white", marginTop: 32}}>Click here to join the team</Button>
                        <Typography variant="body1" align="center" gutterBottom style={{color: "white", marginTop: 32}}>
                            Note that by clicking accept you will lose all access to any previous teams, files, compliance projects and obligations you have created.
                            Your watchlists and read later items will still be accessible.
                        </Typography>
                    </div>)
                    :  [
                        <Typography variant="headline" align="center" gutterBottom style={{color: "white"}}>
                            Oh no! This token is no good!
                        </Typography>,
                        <Typography variant="subheading" align="center" gutterBottom style={{color: "white"}}>
                            {rejectionMessage.message}
                        </Typography>,
                    ]
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        organisation: state.organisation
    }
}

export default connect(mapStateToProps, { ...teamActions })(TeamInviteAccept)
