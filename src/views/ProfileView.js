import React from 'react'
import { Row, Col, Divider, Card, Button, Icon, Avatar, Modal } from 'antd'
import * as actions from './../store/actions/accountActions'
import { connect } from 'react-redux'

const detailsData = [
    {
        title: "Joe Blow",
        description: "admin@example.com",
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
        title: "Examine Change Org",
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
        title: "Current Plan",
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
        <Card
            style={{ width: "40%", margin: 8 }}
            hoverable
            key={props.itemKey}
            onClick={e => props.clickHandler(props.itemKey)}
        >
            <Card.Meta
                avatar={<Avatar size="large" icon={props.avatar||"notification"} />}
                title={props.title||"Card title"}
                description={props.description||"This is the description"}
            />
        </Card>
    )
}

const Section = (props) => (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", flexWrap: "wrap"}}>
        {props.children}
    </div>
)

const AccountView = (props) => {
  return (
    <div style={{padding: 32}}>
        <Row gutter={16} style={{width: "100%"}}>
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
        </Row>
    </div>
    
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

export default connect(mapStateToProps, actions)(AccountView)



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