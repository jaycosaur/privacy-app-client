import React from 'react'
import ModalTemplate from './ModalTemplate'
import { Input, Icon } from 'antd'
import { connect } from 'react-redux'
import * as actions from './../../../store/actions/accountActions'

const OrganisationContents = (props) =>
(
  <ModalTemplate 
    title="Change your organisation information" 
    isLoading={props.isLoading}
    submitTitle="Update" handleOk={() => props.updateOrganisationName({organisationName:props.organisationName,organisationWebsite:props.organisationWebsite})} {...props}>
    <Input
      placeholder="Organisation name"
      prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
      size="large"
      style={{marginBottom: 16}}
      id="organisationName"
      onChange={e => props.handleFormFieldChange({fieldId:e.target.id, val: e.target.value})}
      value={props.organisationName}
      />
    <Input
      placeholder="Organisation website"
      prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
      size="large"
      id="organisationWebsite"
      onChange={e=>props.handleFormFieldChange({fieldId:e.target.id, val: e.target.value})}
      value={props.organisationWebsite}
      />
  </ModalTemplate> 
)


const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.popover.isLoading,
        organisationName: state.popover.selectedModalFields.organisationName,
        organisationWebsite: state.popover.selectedModalFields.organisationWebsite
    }
}

export default connect(mapStateToProps, actions)(OrganisationContents)