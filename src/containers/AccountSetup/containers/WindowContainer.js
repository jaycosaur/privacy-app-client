import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
        width: "60%",
        marginTop: 2*theme.spacing.unit
    },
    containerCard: {
        width: 500,
        height: "80vh",
        overflow: "scroll"
    },
    upperCard: {
        marginBottom: 6*theme.spacing.unit,
        marginTop: 6*theme.spacing.unit,

    },
    middleCard: {
        marginBottom: 6*theme.spacing.unit,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    bottomCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6*theme.spacing.unit,
    }

  })

const WindowContainer = (props) => {
    const { classes } = props
    return (
        <div className={props.classes.root}>
            <div>
                <div className={classes.flexCenter}>
                    <Card className={classes.containerCard} elevation={24}>
                        <CardContent>
                            <div className={classes.upperCard}>
                                <Typography variant="display1" gutterBottom className={classes.centerText} color="primary">
                                    {props.title}
                                </Typography>
                                <Typography variant="subheading" className={classes.centerText}>
                                    {props.subtitle}
                                </Typography>
                            </div>
                            <div className={classes.middleCard}>
                                {props.content}
                            </div>
                            <div className={classes.bottomCard}>
                                <Typography variant="caption" className={classes.centerText} gutterBottom>
                                    {props.progressButtonCaption}
                                </Typography>
                                <Button disabled={props.isProgressButtonDisabled} variant="extendedFab" aria-label="delete" color="secondary" className={classes.progressButton} onClick={props.progressButtonOnClick}>
                                    {props.progressButtonText}
                                    {props.hideForwardIcon||<ForwardIcon/>}
                                </Button>
                            </div>
                            <div className={classes.flexCenter}>
                                <MobileStepper
                                    steps={props.numberOfProgressSteps}
                                    position="static"
                                    variant="dots"
                                    activeStep={props.progressStepNumber}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

WindowContainer.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
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

