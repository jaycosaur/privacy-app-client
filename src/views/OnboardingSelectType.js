import React from 'react'
import { Card, Steps, Layout  } from 'antd'
import { primaryThemeShades, themeColors } from './../theme'
const Step = Steps.Step;

export default () => {
  return (
    <div>
        <div style={{display: "flex", justifyContent: "space-around", margin: "0px 100px"}}>
                <Steps size="small" current={2}>
                    <Step title="Create account" />
                    <Step title="Tell us about yourself" />
                    <Step title="Select your topics" />
                    <Step title="You're all setup" />
                </Steps>
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