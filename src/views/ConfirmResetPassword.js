import React from 'react'
import { Col, Row, Card, message } from 'antd'
import { themeColors, primaryThemeShades, highlightThemeShades } from './../theme'
import polyglotLogo from './../assets/poliglot-logo.svg'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'

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
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox disabled>Remember me</Checkbox>
            )}
            {false&&<a className="login-form-forgot" href="">Forgot password</a>}
            <Button loading={this.props.isLoading} style={{marginTop: 16, width: "100%", background: highlightThemeShades[2], border: themeColors[2], height: 64}} size="large" htmlType="submit" className="login-form-button">
              <strong>SIGN-IN</strong>
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

    return (
        <Row style={{minHeight: "90vh", display: "flex", alignItems: "center"}}>
            <Col span={16} style={{padding: "16px 32px", paddingRight: 64}}>
                <h1 style={{color: "#fff", fontSize: "10em", marginBottom: 32}}>I'm Poliglot.</h1>
                <h1 style={{color: "#fff", fontWeight: 200, paddingBottom: 64}}>
                    A web-based legal technology that tracks and alerts you of policy changes, 
                    analyses and measures public sentiment and dialogue on important issues, and allows advocacy groups, non-for-profits, 
                    and researchers to put their finger on the pulse and engage broadly with citizens.</h1>
            </Col>
            <Col span={8}>
                <Card hoverable >
                    <h1 style={{color: primaryThemeShades[0], fontSize: "4em", marginBottom: 16}}>Sign-in</h1>
                    <p style={{marginBottom: 32}}>We are currently undergoing an invite only BETA. If you would like to be part of this BETA please drop us a line <a>here.</a></p>
                    <WrappedNormalLoginForm isLoading={props.isSigningIn} handleSubmit={props.signInWithEmailAndPassword}/>
                </Card>
            </Col>
        </Row>
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
