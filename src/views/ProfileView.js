import React from 'react'
import { Row, Divider } from 'antd'
import * as actions from './../store/actions/accountActions'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings'
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonBase from '@material-ui/core/ButtonBase';

import LoyaltyIcon from '@material-ui/icons/Loyalty'

import FaceIcon from '@material-ui/icons/Face'
import LockIcon from '@material-ui/icons/Lock'
import WidgetsIcon from '@material-ui/icons/Widgets'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import ReceiptIcon from '@material-ui/icons/Receipt'

import CreditCardIcon from '@material-ui/icons/CreditCard'

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
        <ButtonBase
        style={{ width: "40%", margin: 8}}
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
    )
}

const Section = (props) => (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexWrap: "wrap"}}>
        {props.children}
    </div>
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
    return (
        [isLoading&&<LinearProgress color="secondary" variant="query" />,
        <div style={{padding: 32, height: "100%", overflow: "scroll", background: "#ffa9c4"}}>
            {lastLoaded&&<Row gutter={16} style={{width: "100%"}}>
                <Divider style={{padding: "0 120px"}}><h2>Your Details</h2></Divider>
                <Section>
                    {detailsData.map(item => <MenuItem clickHandler={props.doSelectItem} {...item}/>)}
                </Section>
                <Divider style={{padding: "0 120px"}}><h2>Plan and Usage</h2></Divider>
                <Section>
                    {planData.map(item => <MenuItem clickHandler={props.doSelectItem} {...item}/>)}
                </Section>
                <Divider style={{padding: "0 120px"}}><h2>Billing and Payments</h2></Divider>
                <Section>
                    {billingData.map(item => <MenuItem clickHandler={props.doSelectItem} {...item}/>)}
                </Section>    
            </Row>}
        </div>] 
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        accountInformation: state.user.accountInformation
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

export default connect(mapStateToProps, actions)(ProfileView)
