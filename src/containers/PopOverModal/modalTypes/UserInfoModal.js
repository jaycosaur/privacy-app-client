import React from 'react'
import ModalTemplate from './ModalTemplate'
import { connect } from 'react-redux'
import * as actions from './../../../store/actions/accountActions'
import * as popOverModalActions from './../../../store/actions/popoverModalActions'

import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField'
import LoadingButton from './../../../components/loading/LoadingButton'

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
      onChange={onChange}
    />
  )
  
  const MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="displayName" component={renderTextField} label="Your display name"/>
        </div>
        <div>
          <Field name="email" type="email" component={renderTextField} label="Email"/>
        </div>
        <div>
          {!submitSucceeded?<LoadingButton disabled={pristine} buttonType="submit" buttonText={"Update"} isLoading={submitting} isComplete={submitSucceeded}/>
          :<LoadingButton disabled={pristine} onClick={()=>props.doCloseModal()} buttonText={"Update"} isLoading={submitting} isComplete={submitSucceeded}/>}
        </div>
      </form>
    )
  }

const WrappedForm = reduxForm({form: 'AccountUserInfoForm',validate})(MaterialUiForm)


const UserInfoContents = (props) =>
(
  <ModalTemplate title="Change your information" submitTitle="Update" {...props}>
    <WrappedForm {...props} onSubmit={(e)=>props.updateAccountInformation(e)} closeModal={this.doCloseModal}/>
  </ModalTemplate> 
)

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {
            displayName: state.user.accountInformation.info.displayName,
            email:  state.user.accountInformation.info.email
        },
        isLoading: state.popover.isLoading,
    }
}

export default connect(mapStateToProps, {...actions, ...popOverModalActions})(UserInfoContents)