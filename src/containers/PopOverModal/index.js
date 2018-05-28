import React from 'react'
import { Modal, Button, Input, Icon, Select } from 'antd'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/popoverModalActions'
import ModalTemplate from './modalTypes/ModalTemplate'
import OrganisationModal from './modalTypes/OrganisationModal'
import CreateWatchModal from './modalTypes/CreateWatchModal'


const PopOverModal = (props) => {
  switch(props.selectedModal){
    case "create-watch":
      return <CreateWatchModal {...props} />
    case "password":
      return <PasswordContents {...props} />
    case "userinfo":
      return <UserInfoContents {...props} />
    case "notification":
      return <PasswordContents {...props} />
    case "organisation":
      return <OrganisationModal {...props} />
    case "plantype":
      return <PasswordContents {...props} />
    case "planusage":
      return <PasswordContents {...props} />
    case "invoices":
      return <PasswordContents {...props} />
    case "payment":
      return <PaymentContents {...props} />
    default:
      return null
  }

}

const mapStateToProps = (state, ownProps) => {
    return {
        isShowing: state.popover.isShowing,
        selectedModal: state.popover.selectedModal
    }
}

export default connect(mapStateToProps, actions)(PopOverModal)

const CreateWatchContents = (props) =>
  (
    <ModalTemplate title="Create a Watch for these parameters?" submitTitle="Create Watch" {...props} handleOk={e => console.log(e)}>
      <p>Give your watch a title.</p>
      <Input
        placeholder="Watch title"
        style={{marginBottom: 16}}
        />
      <p>How often would you like to be notified via email of changes?</p>
      <Select defaultValue="Select a time period" style={{ width:240 }}>
        <Select.Option value="jadck">As soon as possible</Select.Option>
        <Select.Option value="jack">Hourly</Select.Option>
        <Select.Option value="lucy">Daily</Select.Option>
        <Select.Option value="disabled" disabled>Every two days</Select.Option>
        <Select.Option value="Yiminghe">Every four days</Select.Option>
        <Select.Option value="Yimingheasdf">Once a week</Select.Option>
        <Select.Option value="jagck">Never</Select.Option>
      </Select>
    </ModalTemplate>
  )

const PasswordContents = (props) =>
  (
    <ModalTemplate title="Change your password" submitTitle="Change Password" {...props}>
      <Input
        placeholder="Enter your old password."
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16}}
        />
      <Input
        placeholder="Enter your new password."
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16}}
        />
      <Input
        placeholder="Repeat your new password."
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        />
    </ModalTemplate>
  )

const OrganisationContents = (props) =>
  (
    <ModalTemplate title="Change your organisation information" submitTitle="Update" {...props}>
      <Input
        placeholder="Organisation name"
        prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16}}
        />
      <Input
        placeholder="Organisation website"
        prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        />
    </ModalTemplate> 
  )

const UserInfoContents = (props) =>
  (
    <ModalTemplate title="Change your information" submitTitle="Update" {...props}>
      <Input
        placeholder="Enter your name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16}}
        />
      <Input
        placeholder="Enter your email"
        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        />
    </ModalTemplate> 
  )

  const PaymentContents = (props) =>
  (
    <ModalTemplate title="Change your payment details" submitTitle="Update" {...props}>
      <Input
        placeholder="Enter your card number"
        prefix={<Icon type="credit-card" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16}}
        />
      <Input
        placeholder="Expiry Date"
        prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16, width: "50%"}}
        />
      <Input
        placeholder="CVV"
        prefix={<Icon type="check" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        style={{marginBottom: 16, width: "50%"}}
        />
      <Input
        placeholder="Name on the card"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"
        />
    </ModalTemplate> 
  )