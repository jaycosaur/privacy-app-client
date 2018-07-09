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




const billingData = [
    {
        title: "Your Invoices",
        description: "View and download your payment history",
        itemKey: "invoices",
        avatar: "calendar"
    },
    {
        title: "Payment Information",
        description: "Change Payment Method or Information",
        itemKey: "payment",
        avatar: "credit-card"
    }
]



const MenuItem = (props) => {
    return (
        <ButtonBase
        style={{ width: "40%", margin: 8}}
        >
            <Card
                style={{ width: "100%"}}
                key={props.itemKey}
                onClick={e => props.clickHandler(props.itemKey)}
            >
            {false&&<LinearProgress />}
            <CardHeader
                avatar={
                <Avatar aria-label="Recipe" >
                    <SettingsIcon />
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
            avatar: "profile"
        },
        {
            title: "Notifications",
            description: "Watchlist alerts and newsletter",
            itemKey: "notification",
            avatar: "notification"
        },
        {
            title: organisation,
            description: "Your Organisation Settings",
            itemKey: "organisation",
            avatar: "team"
        },
        {
            title: "Password",
            description: "Change your password",
            itemKey: "password",
            avatar: "lock"
        }
    ]
    const planData = [
        {
            title: planType,
            description: "Change your plan",
            itemKey: "plantype",
            avatar: "appstore"
        },
        {
            title: "Plan Usage",
            description: "Plan Limits and Usage",
            itemKey: "planusage",
            avatar: "dashboard"
        }
    ]
    return (
        [isLoading&&<LinearProgress color="secondary" variant="query" />,
        <div style={{padding: 32, height: "92vh", overflow: "scroll"}}>
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

/*

<Col span={12}>
            <Card title={<span><Icon type="profile" /> Your details</span>} style={{marginBottom: 16}}>
                <p>Email address:</p>
                <p>Your Name:</p>
                <p>Your Organisation:</p>
                <p>Organisation Type:</p>
                <p>Login details: Your Email</p>
                <Button>Update Password</Button>
            </Card>
            <Card title={<span><Icon type="notification" /> Notification Settings</span>}>
                <p>Watchlist emails alert frequency</p>
                <p>You are currently unsubscribed from our newsletter. Would you like to subscribe?</p>
            </Card>
        </Col>
        <Col span={12}>
            <Card title={<span><Icon type="credit-card" /> Billing and Plan Settings</span>}>
                <h3>Payments</h3>
                <p>Current Plan: XXXX</p>
                <p>Next Bill: $50 in 15 days</p>

                <p>You are current on the 'BASIC' plan. This plan allows you to blah blah blah.</p>
                <a>Want to Upgrade your plan?</a>
                <h3>Cancel Account</h3>
                <p>Do you want to delete your account?</p>
            </Card>
        </Col>
*/