import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as teamActions from './../store/actions/teamActions'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import partyemoji from './../assets/partypopperemoji.png'

import { Link } from 'react-router-dom'

class TeamInviteSuccess extends Component {
    // take token
    // send to api
    // api gets email of user who requested
    // api retrieves object from key of database
        // gets email from object
        // gets organisationId from object
    // checks email against email of request
        // if match updates users profile to incorporate organisation id and updates organisation with userId, redirects to home page
        // if no match rejects and redirects to home page
    
    render() {
        return (
            <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f97794"}}>
                <div style={{maxWidth: 500, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingBottom: 100}}>
                    <img src={partyemoji} width="160px" style={{marginBottom: 32}} alt=""/>
                    <Typography variant="display3" align="center" gutterBottom style={{color: "white"}}>Congratulations!</Typography>
                    <Typography variant="headline" align="center" gutterBottom style={{color: "white"}}>You are now part of the {this.props.organisation.name} team.</Typography>
                    <Link to="/compliance-workspace"><Button variant="extendedFab" color="primary" style={{color: "white", marginTop: 32}}>Check out {this.props.organisation.name}'s compliance workspace</Button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        organisation: state.organisation
    }
}

export default connect(mapStateToProps, { ...teamActions })(TeamInviteSuccess)
