import React from 'react'
import ModalTemplate from './ModalTemplate'
import DialogContainer from './DialogContainer'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux'
import * as actions from './../../../store/actions/accountActions'
import * as popOverModalActions from './../../../store/actions/popoverModalActions'

import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField'
import LoadingButton from './../../../components/loading/LoadingButton'

const validate = values => {
    const errors = {}
    const requiredFields = [ 'oldPassword', 'newPassword', 'repeatPassword' ]
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Required'
      }
    })
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Passwords must match.'
    }
    return errors
  }
  
  const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error }, type, ...custom }) => (
    <TextField 
      label={(touched&&error)||label}
      error={touched&&error}
      placeholder={label}
      value={value}
      type={type}
      fullWidth
      onChange={onChange}
    />
  )
  
  const MaterialUiForm = props => {
    const { handleSubmit, pristine, isLoading } = props
    return (
      <DialogContainer 
          title="Change your password" 
          submitTitle="Update" 
          {...props}
          buttonType="submit"
          submitDisabled={pristine||isLoading}
          handleOk={handleSubmit}
          handleClose={props.closeModal}
          >
        <form onSubmit={handleSubmit}>
            <div>
              <Field name="oldPassword" type="password" component={renderTextField} label="Current Password"/>
            </div>
            <div>
              <Field name="newPassword" type="password" component={renderTextField} label="New Password"/>
            </div>
            <div>
              <Field name="repeatPassword" type="password" component={renderTextField} label="Repeat Password"/>
            </div>
        </form>
       </DialogContainer>

    )
  }

const WrappedForm = reduxForm({form: 'AccountChangePasswordForm', validate})(MaterialUiForm)


const UserInfoContents = (props) => <WrappedForm 
                                      {...props} 
                                      onSubmit={(e)=>props.setNewAccountPassword(e)} 
                                      closeModal={()=>props.doCloseModal()}
                                      />

const mapStateToProps = (state) => {
    return {
        initialValues: {
            displayName: state.user.accountInformation.info.displayName,
            email:  state.user.accountInformation.info.email
        },
        isLoading: state.popover.isLoading,
    }
}

export default connect(mapStateToProps, {...actions, ...popOverModalActions})(UserInfoContents)