import React from 'react'
import { Col, Row, message } from 'antd'
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (values.email.length === 0) {
        errors.email = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length === 0) {
        errors.password = 'Required'
    }
    return errors
  }
  
const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error }, ...custom }) => (
    <TextField 
        label={label}
        errorText={touched && error}
        value={value}
        onChange={onChange}
        fullWidth
        margin="normal"
        error={touched && error}
        {...custom}
    />
)
  
const MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = props
    return (
        <form onSubmit={handleSubmit} onKeyPress={e=>e.key==="Enter"&&handleSubmit}>
            <Field name="email" component={renderTextField} label="Email address"/>
            <Field name="password" component={renderTextField} label="Password" type="password"/>
            <div style={{marginBottom: 24}}><Link to="/signin/resetpassword">Forgot password</Link></div>
            <Button 
              variant="contained" 
              color="secondary" 
              disabled={pristine || submitting || props.isLoading}
              variant="extendedFab" 
              type="submit"
              style={{ 
                marginTop: 16, 
                width: "100%",
                height: 64,
                background: !(pristine || submitting || props.isLoading)?"linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)":"linear-gradient(-45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
                color: "white"
              }} 
              className="login-form-button"
              >
              <strong>SIGN-IN</strong>{props.isLoading&&"..."}
            </Button>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'signinUserForm', validate})(MaterialUiForm)

const Signin = (props) => {
    if (props.signInError&&props.signInErrorMessage){
        message.error(props.signInErrorMessage)
    }

    return (
      <div style={{padding: "32px", paddingTop: 0,
        background: "white",
        backgroundImage: 'url("http://polibase.com.au/wp-content/uploads/2017/07/hero.jpg")'
      }}>
        <Row style={{minHeight: "90vh", display: "flex", alignItems: "center"}}>
            <Col span={16} style={{padding: "16px 32px", paddingRight: 64}}>
                <h1 style={{color: "white", fontSize: "10em", marginBottom: 32}}>I'm Polibase.</h1>
                <h1 style={{color: "white", fontSize: "3em", fontWeight: 300, paddingBottom: 64}}>
                  Automating regulatory compliance for Australian organisations.
                </h1>
            </Col>
            <Col span={8}>
                <Card>
                    <CardContent>
                        <h1 style={{color: "rgba(249,119,148,1)", fontSize: "4em", marginBottom: 16}}>Sign-in</h1>
                        <p style={{marginBottom: 24}}>We are currently undergoing closed BETA. If you would like to be part of this BETA please drop us a line <a href="http://polibase.com.au/sign-up-for-the-pilot/" target="_blank">here.</a></p>
                        <WrappedForm isLoading={props.isSigningIn} onSubmit={props.signInWithEmailAndPassword}/>
                    </CardContent>
                </Card>
            </Col>
        </Row>
      </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSigningIn: state.user.isSigningIn,
        signInError: state.user.signInError,
        signInErrorMessage: state.user.signInErrorMessage&&state.user.signInErrorMessage.code
    }
}

export default connect(mapStateToProps, authActions)(Signin)
