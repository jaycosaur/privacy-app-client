import React from 'react'
import {highlightThemeShades, primaryThemeShades } from './../../theme'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

const CardItem = (props) => (
    <ButtonBase>
        <Card style={{background: props.background, padding:0, borderRadius: 8}}>
                <div style={{height: 60, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "8px 8px 0 0"}}>
                    <h3 style={{color: "white", fontWeight: 600, margin: 0}}>{props.title}</h3>
                </div>
                <div style={{background: "rgba(256,256,256,0.4)", height: 60, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "space-between", flexDirection: "column"}}>
                    <div>
                        <Link to={props.path}><Button variant="contained" color="secondary" style={{float: "right", fontWeight: 500}}>Let's go</Button></Link>
                    </div>
                </div>
        </Card>
    </ButtonBase>
)


const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*4,
        height: "92vh",
        overflow: "scroll"
    },
    buttonCard: {

    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    cover: {
        width: 90,
        height: 90,
        borderRadius: 10
    },
    coverBig: {
        width: 120,
        height: 120,
    },
    updateContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing.unit*2,
        paddingBottom: theme.spacing.unit*2
    },
    fixedSide: {

    },
    bottomMargin: {
        marginBottom: theme.spacing.unit*4,
    },
    summaryInnerCard: {
        
    },
    cardFlex: {
        display: 'flex',
        marginBottom: theme.spacing.unit*4,
    },
})


const HomeView = (props) => {
    return (
            <Card>
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
            </Card>
            )}

export default withStyles(styles)(HomeView)