import React from 'react'
import ModalTemplate from './ModalTemplate'
import DialogContainer from './DialogContainer'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux'
import * as actions from './../../../store/actions/accountActions'
import * as popOverModalActions from './../../../store/actions/popoverModalActions'

import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField'
import LoadingButton from './../../../components/loading/LoadingButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const validate = values => {
    const errors = {}
    const requiredFields = [ 'displayName', 'email' ]
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Required'
      }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }
  
  const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error }, ...custom }) => (
    <TextField 
      label={label}
      errorText={touched && error}
      value={value}
      fullWidth
      onChange={onChange}
    />
  )
  
  const MaterialUiForm = props => {
    const { handleSubmit, pristine, isLoading, notificationSettings={} } = props
    return (
      <DialogContainer 
          title="Notification Settings" 
          submitTitle="Done" 
          {...props}
          buttonType="submit"
          submitDisabled={pristine||isLoading}
          handleOk={handleSubmit}
          handleClose={props.closeModal}
          >
          <List component="nav">
            <ListItem>
              <ListItemText primary="Polibase Alerts when assigned to actions" />
              <ListItemSecondaryAction>
                <Switch checked={notificationSettings.platform||true} onChange={()=>props.handleChange('platform')} value="platform" />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Polibase Daily Emails" />
              <ListItemSecondaryAction>
                <Switch checked={notificationSettings.daily||true} onChange={()=>props.handleChange('daily')} value="daily" />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Polibase Media and News" />
              <ListItemSecondaryAction>
                <Switch checked={notificationSettings.marketing||true} onChange={()=>props.handleChange('marketing')} value="marketing" />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Platform Feature Update Emails" />
              <ListItemSecondaryAction>
                <Switch checked={notificationSettings.features||true} onChange={()=>props.handleChange('features')} value="features" />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
       </DialogContainer>

    )
  }

const WrappedForm = reduxForm({form: 'AccountUserInfoForm',validate})(MaterialUiForm)


const UserInfoContents = (props) => <WrappedForm 
                                      {...props} 
                                      onSubmit={(e)=>console.log(e)} 
                                      handleChange={e=>console.log(e)}
                                      closeModal={()=>props.doCloseModal()}
                                      />

const mapStateToProps = (state) => {
    return {
        initialValues: {
            displayName: state.user.accountInformation.info.displayName,
            email:  state.user.accountInformation.info.email,
            notificationSettings:  state.user.accountInformation.info.notificationSettings
        },
        isLoading: state.popover.isLoading,
    }
}

export default connect(mapStateToProps, {...actions, ...popOverModalActions})(UserInfoContents)