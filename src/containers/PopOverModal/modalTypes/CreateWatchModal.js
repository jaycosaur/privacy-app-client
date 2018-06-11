import React from 'react'
import ModalTemplate from './ModalTemplate'
import { Input, Icon, Select } from 'antd'
import { connect } from 'react-redux'
import * as filterActions from './../../../store/actions/filterActions'
import * as accountActions from './../../../store/actions/accountActions'

const OrganisationContents = (props) =>
(
  <ModalTemplate 
    title="Create a Watch for these parameters?" 
    isLoading={props.isLoading}
    submitTitle="Create Watch" handleOk={() => props.createPolicyWatch()} {...props}>
    <p>Give your watch a title.</p>
    <Input
      placeholder="Watch title"
      id="watchAlertTitle"
      value={props.watchAlertTitle}
      onChange={e => props.handleFormFieldChange({fieldId:e.target.id, val: e.target.value})}
      style={{marginBottom: 16}}
      />
    <p>How often would you like to be notified via email of changes?</p>
    <Select defaultValue="Select a time period" style={{ width:240 }} onSelect={e => props.handleFormFieldChange({fieldId:"watchAlertFrequency", val: e})}>
      <Select.Option value="asap">As soon as possible</Select.Option>
      <Select.Option value="hourly">Hourly</Select.Option>
      <Select.Option value="twicedaily">Twice Daily</Select.Option>
      <Select.Option value="daily">Daily</Select.Option>
      <Select.Option value="weekly">Once a week</Select.Option>
      <Select.Option value="never">Never</Select.Option>
    </Select>
  </ModalTemplate> 
)


const mapStateToProps = (state, ownProps) => {
    return {
        watchAlertTitle: state.popover.selectedModalFields.watchAlertTitle,
        watchAlertFrequency: state.popover.selectedModalFields.watchAlertFrequency,
        isLoading: state.watchlist.isCreatingWatchlist
    }
}

export default connect(mapStateToProps, {...accountActions, ...filterActions})(OrganisationContents)