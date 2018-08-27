import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MobileStepper from '@material-ui/core/MobileStepper';

import PropTypes from 'prop-types'

import ForwardIcon from '@material-ui/icons/NavigateNext';

const styles = theme => ({
    root: {
        height: "92vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)"
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    flexCenter: {
        display: "flex", justifyContent: "space-around",
    },
    centerText: {
        textAlign: "center"
    },
    progressButton: {
        width: "40%",
    },
    containerCard: {
        width: 500,
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: 0
    },
    upperCard: {
        marginBottom: 2*theme.spacing.unit,
        marginTop: 2*theme.spacing.unit,
    },
    middleCard: {
        paddingBottom: 2*theme.spacing.unit,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        height: "100%"
    },
    bottomCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2*theme.spacing.unit,
    }
  })

const WindowContainer = (props) => {
    const { classes } = props
    return (
                <Card elevation={24}>
                    <CardContent className={classes.containerCard} style={{paddingBottom: 0}}>
                        <div>
                            <div className={classes.flexCenter}>
                                <MobileStepper
                                    steps={props.numberOfProgressSteps}
                                    position="static"
                                    variant="dots"
                                    activeStep={props.progressStepNumber}
                                />
                            </div>
                            <div className={classes.upperCard}>
                                <Typography variant="display1" gutterBottom className={classes.centerText} color="primary">
                                    {props.title}
                                </Typography>
                                <Typography variant="subheading" className={classes.centerText}>
                                    {props.subtitle}
                                </Typography>
                            </div>
                        </div>
                        <div style={{flex: 1, overflow: "scroll", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <div className={classes.middleCard}>
                                {props.content}
                            </div>
                            {false&&<div className={classes.bottomCard}>
                                <Typography variant="caption" className={classes.centerText} gutterBottom>
                                    {props.progressButtonCaption}
                                </Typography>
                            </div>}
                        </div>
                    </CardContent>
                    <CardActions style={{background: "none"}}>
                        <div style={{flex: 1}}/>
                        <Button disabled={props.isProgressButtonDisabled} variant="extendedFab" aria-label="delete" color="secondary" className={classes.progressButton} onClick={props.progressButtonOnClick}>
                            {props.progressButtonText}
                            {props.hideForwardIcon||<ForwardIcon/>}
                        </Button>
                    </CardActions>
                </Card>
    )
}

WindowContainer.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    content: PropTypes.node.isRequired,
    progressButtonCaption: PropTypes.string.isRequired,
    progressButtonText: PropTypes.string.isRequired,
    hideForwardIcon: PropTypes.bool,
    numberOfProgressSteps: PropTypes.number.isRequired,
    progressStepNumber: PropTypes.number.isRequired,
    progressButtonOnClick: PropTypes.func.isRequired,
    isProgressButtonDisabled: PropTypes.bool
}

export default withStyles(styles)(WindowContainer)

