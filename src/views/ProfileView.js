import React from 'react'
import { Row, Divider } from 'antd'
import * as actions from './../store/actions/accountActions'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import LoyaltyIcon from '@material-ui/icons/Loyalty'

import FaceIcon from '@material-ui/icons/Face'
import LockIcon from '@material-ui/icons/Lock'
import WidgetsIcon from '@material-ui/icons/Widgets'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import ReceiptIcon from '@material-ui/icons/Receipt'
import WarningIcon from '@material-ui/icons/Warning'

import CreditCardIcon from '@material-ui/icons/CreditCard'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';


const billingData = [
    {
        title: "Your Invoices",
        description: "View and download your payment history",
        itemKey: "invoices",
        avatar: <ReceiptIcon  color="secondary"/>,
        disabled: true
    },
    {
        title: "Payment Information",
        description: "Change Payment Method or Information",
        itemKey: "payment",
        avatar: <CreditCardIcon color="secondary"/>,
        disabled: true
    }
]


const MenuItem = (props) => {
    return (
        <Grid item xs={12} md={6}>
            <ButtonBase
            style={{ width: "100%", margin: 8}}
            disabled={props.disabled}
            >
                <Card
                    style={{ width: "100%", opacity: props.disabled&&0.5}}
                    key={props.itemKey}
                    onClick={e => props.clickHandler(props.itemKey)}
                >
                <CardHeader
                    avatar={
                    <Avatar aria-label="symbol" style={{background: "none"}}>
                        {props.avatar}
                    </Avatar>
                    }
                    title={props.title}
                    subheader={props.description}
                />
                </Card>
            </ButtonBase>
        </Grid>
    )
}

const Section = (props) => (
    <Grid container spacing={isWidthUp('md', props.width)&&32}>
        {props.children}
    </Grid>
)

const AccountView = (props) => {
    const { isLoading, lastLoaded, info: {displayName="No Display Name Found", email, organisation="No Organisation Name Found", planType="No Plan Selected"} } = props.accountInformation
    const detailsData = [
        {
            title: displayName,
            description: email,
            itemKey: "userinfo",
            avatar: <FaceIcon color="secondary"/>
        },
        {
            title: "Notifications",
            description: "Watchlist alerts and newsletter",
            itemKey: "notification",
            avatar: <NotificationsActiveIcon color="secondary"/>,
            disabled: true
        },
        {
            title: "Refer a friend",
            description: "Earn Credit by referring friends to Polibase",
            itemKey: "organisation",
            avatar: <LoyaltyIcon color="secondary"/>,
            disabled: true
        },
        {
            title: "Password",
            description: "Change your password",
            itemKey: "password",
            avatar: <LockIcon color="secondary" />
        }
    ]
    const planData = [
        {
            title: planType,
            description: "Change your plan",
            itemKey: "plantype",
            avatar: <WidgetsIcon color="secondary"/>,
            disabled: true
        },
        {
            title: "Plan Usage",
            description: "Plan Limits and Usage",
            itemKey: "planusage",
            avatar: <ShowChartIcon color="secondary"/>,
            disabled: true
        }
    ]

    const isMobile =!isWidthUp('md', props.width)

    return (
        [isLoading&&<LinearProgress color="secondary" variant="query" />,
        props.user&&!props.user.emailVerified&&<AppBar position="static" color="secondary">
            <Toolbar variant="dense">
                <WarningIcon style={{marginRight: 8, color: "white"}}/>
                <Typography variant="subheading"
                    color="inherit"
                    style={{color: "white"}}>
                    You Have Not Verified Your Email Address
                </Typography>
                <div style={{flex: 1}} />
                <Button onClick={()=>props.sendVerificationEmail()} variant="outlined" style={{color: "white"}} disabled={props.emailVerificationSent}>{props.emailVerificationSent?"Sent":"send verification email"}</Button>
            </Toolbar>
        </AppBar>,
        <div style={{padding: 32, height: "100%", overflow: "scroll", background: "White"}}>
            {lastLoaded&&<Row gutter={16} style={{width: "100%"}}>
                {!isMobile&&<Divider style={{padding: "0 120px"}}><h2>Your Details</h2></Divider>}
                <Section width={props.width}>
                    {detailsData.map(item => <MenuItem clickHandler={props.doSelectItem} {...item}/>)}
                </Section>
                {!isMobile&&<Divider style={{padding: "0 120px"}}><h2>Plan and Usage</h2></Divider>}
                <Section width={props.width}>
                    {planData.map(item => <MenuItem clickHandler={props.doSelectItem} {...item}/>)}
                </Section>
                {!isMobile&&<Divider style={{padding: "0 120px"}}><h2>Billing and Payments</h2></Divider>}
                <Section width={props.width}>
                    {billingData.map(item => <MenuItem clickHandler={props.doSelectItem} {...item}/>)}
                </Section>    
            </Row>}
        </div>] 
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        accountInformation: state.user.accountInformation,
        user: state.user.user,
        emailVerificationSent: state.user.emailVerificationSent
    }
}

class ProfileView extends React.Component {
    componentDidMount(){
        this.props.getAccountInformation()
    }

  render() {
    return (<AccountView {...this.props} />)
  }
}

export default connect(mapStateToProps, actions)(withWidth()(ProfileView))
