import React from 'react'
import { Col, Row, Card, message } from 'antd'
import { themeColors, primaryThemeShades, highlightThemeShades } from './../theme'
import polyglotLogo from './../assets/poliglot-logo.svg'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as authActions from './../store/actions/authActions'
import { push } from 'react-router-redux'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.handleSubmit(values)
        }
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email address" />
            )}
          </FormItem>
          <FormItem>
            <Button loading={this.props.isLoading} style={{marginTop: 16, width: "100%", background: highlightThemeShades[2], border: themeColors[2], height: 64}} size="large" htmlType="submit" className="login-form-button">
              <strong>SEND EMAIL</strong>
            </Button>
          </FormItem>
        </Form>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


const Signin = (props) => {
    if (props.signInError){
        message.error(props.signInErrorMessage)
    }

    if (props.resetEmailSent){
        message.success('Email successfully sent, check your inbox! Redirecting to sign-in.', 3, props.pushToHome);
    }

    return (
        <Row style={{minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Col span={8}>
                <Card hoverable >
                    <h1 style={{color: primaryThemeShades[0], fontSize: "3.8em", marginBottom: 16}}>Reset Password</h1>
                    <p style={{marginBottom: 32}}>We will send a link to your email address to reset your password.</p>
                    <WrappedNormalLoginForm isLoading={props.isSigningIn} handleSubmit={props.doPasswordReset}/>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSigningIn: state.user.isSendingResetEmail,
        signInError: state.user.resetEmailError,
        signInErrorMessage: state.user.resetEmailErrorMessage&&state.user.resetEmailErrorMessage.code,
        resetEmailSent: state.user.resetEmailSent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    doPasswordReset: (email) => {
      dispatch(authActions.doPasswordReset(email))
    },
    pushToHome: () => {
      dispatch(push('/'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
