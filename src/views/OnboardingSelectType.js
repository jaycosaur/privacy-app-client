import React from 'react'
import { Card, Layout  } from 'antd'
import { primaryThemeShades, themeColors } from './../theme'
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const steps = ["Create account","Tell us about yourself","Select your topics","You're all setup"]

const styles = theme => ({
    root: {
      width: '90%',
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  });

const CardSelect = (props) => {
  return (
    <div className={props.classes.root}>
        <div style={{display: "flex", justifyContent: "space-around", margin: "0px 100px"}}>
            <Stepper activeStep={3} alternativeLabel>
                {steps.map(i=>(
                    <Step key={i}>
                        <StepLabel>{i}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
        <Layout.Content style={{minHeight: "90vh", display: "flex", alignItems: "center", flexDirection: "column", paddingTop: 60}}>
            <h1 style={{fontWeight: 400, color: primaryThemeShades[0]}}>What type of organisation are you?</h1>
            <p>Already know what content you're interested in? <a>Skip this step.</a></p>
            <div style={{margin: "16px 0"}}>
                <div style={{width: 400}}>
                    <ButtonCard text="Not for profit"/>
                    <ButtonCard text="Disabilities" />
                </div>
                <div style={{width: 400}}>
                    <ButtonCard text="Education" />
                    <ButtonCard text="Other" />
                </div>
            </div>
        </Layout.Content>
    </div>
  )
}

const ButtonCard = (props) => (
    <Card.Grid style={{height: 200, width: "50%",textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", background:  primaryThemeShades[1]}}>
        <h2 style={{fontWeight: 300, color: "white"}}>{props.text}</h2>
    </Card.Grid>
)

export default withStyles(styles)(CardSelect)