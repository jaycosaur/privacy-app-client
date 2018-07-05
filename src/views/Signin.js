import React from 'react'
import { Col, Row, message } from 'antd'
import { themeColors, primaryThemeShades, highlightThemeShades } from './../theme'
import { Form, Icon, Input, Checkbox } from 'antd';
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
            <div><Link to="/signin/resetpassword">Forgot password</Link></div>
            <Button variant="contained" color="secondary" disabled={this.props.isLoading} onClick={this.handleSubmit} variant="extendedFab" style={{marginTop: 16, width: "100%", height: 64}} htmlType="submit" className="login-form-button">
              <strong>SIGN-IN</strong>{this.props.isLoading&&"..."}
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
      <div style={{padding: "32px", paddingTop: 0,

        background: "rgba(98,58,162,1)",
        background: "-moz-linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        background: "-webkit-gradient(left bottom, right top, color-stop(0%, rgba(98,58,162,1)), color-stop(100%, rgba(249,119,148,1)))",
        background: "-webkit-linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        background: "-o-linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        background: "-ms-linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#623aa2', endColorstr='#f97794', GradientType=1 )",
      
      
      }}>
        <Row style={{minHeight: "90vh", display: "flex", alignItems: "center"}}>
            <Col span={16} style={{padding: "16px 32px", paddingRight: 64}}>
                <h1 style={{color: "#fff", fontSize: "10em", marginBottom: 32}}>I'm Polity.</h1>
                <h1 style={{color: "#fff", fontSize: "3em", fontWeight: 300, paddingBottom: 64}}>
                  A regulatory intelligence platform powered by AI.
                </h1>
            </Col>
            <Col span={8}>
                <Card hoverable >
                  <CardContent>
                    <h1 style={{color: primaryThemeShades[0], fontSize: "4em", marginBottom: 16}}>Sign-in</h1>
                    <p style={{marginBottom: 32}}>We are currently undergoing an invite only BETA. If you would like to be part of this BETA please drop us a line <a>here.</a></p>
                    <WrappedNormalLoginForm isLoading={props.isSigningIn} handleSubmit={props.signInWithEmailAndPassword}/>
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
