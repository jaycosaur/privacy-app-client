import React from 'react'
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';

export default () => {
  return (
    <div style={{minHeight: "100vh", background: "white"}}>
        <div style={{zIndex: 0, height: 480,background: themeColors[0], padding: "30px 0", display: "flex", justifyContent: "center", alignItems:"center"}}>
            <div style={{width: "80%"}}>
                <p style={{color: "white", fontSize: "2em", fontWeight: 400, margin: 0}}>Welcome to Polity!</p>
                <p style={{color: "white", fontSize: "4em", fontWeight: 700}}>Here are a bunch of helpful resources to help get you started.</p>
            </div>
        </div>
        <div style={{zIndex: 100, width: "100%", marginTop: -80, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "flex", width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 32}}>
                <CardItem background={highlightThemeShades[1]} title="Policy and Legislation" path="/policy-tracker"/>
                <CardItem background={highlightThemeShades[2]} title="Twitter and News" path="/news"/>
                <CardItem background={highlightThemeShades[4]} title="Email Alerts" path="/watchlist"/>
            </div>
            <div style={{display: "flex", width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 32}}>
                <CardItem background={primaryThemeShades[1]} title="Watchlist" path="/watchlist"/>
                <CardItem background={primaryThemeShades[2]} title="Account Settings" path="/myaccount"/>
                <CardItem background={primaryThemeShades[4]} title="Upgrade Plan" path="/myaccount"/>
            </div>
        </div>
        <div style={{padding: 30}}>
            <p style={{textAlign: "center"}}><small>View our Terms <Divider type="vertical" /> Read our Privacy Policy</small></p>
        </div>
    </div>
  )
}

const CardItem = (props) => (
    <Card 
        bordered={false} 
        hoverable 
        style={{width: "30%",  background:  props.background, padding:0, borderRadius: 8}}
        bodyStyle={{height: 300, padding: 0, borderRadius: 8}}>
            <div style={{height: 60, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px 8px 0 0"}}>
                <h1 style={{color: "white", fontWeight: 600, margin: 0}}>{props.title}</h1>
            </div>
            <div style={{background: "rgba(256,256,256,0.4)", height: 240, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "space-between", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <p style={{fontSize: "1.1em"}}>
                        A web-based legal technology that tracks and alerts you of policy changes, analyses and measures public sentiment and dialogue on important issues
                    </p>
                </div>
                <div>
                    <Link to={props.path}><Button variant="contained" color="secondary" style={{float: "right", fontWeight: 500}}>Let's go</Button></Link>
                </div>
            </div>
    </Card>
)
