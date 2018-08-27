import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

import EntryFlowView from './EntryFlowView'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { push } from 'connected-react-router'

const styles = theme => {
    return ({
      mainText: {
          [theme.breakpoints.down('sm')]: {
              ...theme.typography.display1,
              color: "white",
              fontWeight: 500,
          },
          [theme.breakpoints.up('md')]: {
              ...theme.typography.display3,
              color:  "white",
              fontWeight: 500,
          },
      },
      secondaryText: {
          color:  "white",
          fontWeight: 300,
          [theme.breakpoints.down('sm')]: {
              ...theme.typography.display1,
              color:  "white",
              fontWeight: 300,
              textAlign: "center",
              marginTop: 64
          },
      },
      formCard: {
          maxWidth: 400,
          [theme.breakpoints.down('xs')]: {
              height: "60%"
          },
      },
      mainButton: {
          marginTop: 16, 
          width: "100%",
          height: 64,
          color: "white"
      }
    }
  )};

const SignupView = (props) => {
    const { classes } = props
    return (
        <EntryFlowView
            rightWhite
            leftCard={
                [
                    <Hidden mdDown>
                        <Typography align="left" gutterBottom className={classes.mainText}>Welcome to POLIBASE.</Typography>
                    </Hidden>,
                    <Typography variant="display1" className={classes.secondaryText}>Ready to get your compliance under control? Create a new team or join an existing team.</Typography>
                ]
            }
            rightCard={
                [
                    <Typography variant="title" align="center" style={{marginBottom: 32}} gutterBottom>
                        Has your organisation already set-up Polibase? Join the team and be part of the action!
                        If you're setting up Polibase on behalf of your organisation - you can create a new team here!                    
                    </Typography>,
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button variant="extendedFab" color="primary" style={{color: "white"}} onClick={()=>props.goToNewTeam()}>CREATE A NEW TEAM</Button>
                        <Button variant="extendedFab" color="secondary" style={{color: "white"}} onClick={()=>props.goToTeamInvite()}>JOIN AN EXISTING TEAM</Button>
                    </div>
                ]
            }>
        </EntryFlowView>
    )
}

const mapStateToProps = (state) => {
  return {
      isSigningUp: state.user.isSigningUp,
      signUpError: state.user.signUpError,
      signUpErrorMessage: state.user.signUpErrorMessage,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goToNewTeam: () => {
            dispatch(push("/create-new-team"))
        },
        goToTeamInvite: () => {
            dispatch(push("/awaiting-invite"))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignupView))
