import React from 'react'
import { Col, Row, message } from 'antd'
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'
import { push } from 'react-router-redux'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'


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
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input type="password" size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button loading={this.props.isLoading} style={{marginTop: 16, width: "100%", background: "#f97794", height: 64}} size="large" htmlType="submit" className="login-form-button">
              <strong>SIGNUP</strong>
            </Button>
          </FormItem>
        </Form>
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


const Signin = (props) => {
    if (props.signUpError){
        message.error(props.signInErrorMessage.message)
    }

    return (
      <div style={{position: "absolute", top:0, bottom: 0, right: 0, left: 0, background: "#623aa2"}}>
        <Row style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Col span={8}>
                <Card elevation={20}>
                  <CardContent>
                    <h1 style={{color: "#f97794", fontSize: "3.0em", marginBottom: 16}}>Signup To Polibase</h1>
                    <p style={{marginBottom: 32}}>Manage compliance across your organisation and stay on-top of ever-changing laws, 
all on one easy-to-use web platform. We'd love to have you on-board.</p>
                    <WrappedNormalLoginForm isLoading={props.isSigningUp} handleSubmit={props.doSignupUser}/>
                  </CardContent>
                </Card>
            </Col>
        </Row>
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isSigningUp: state.user.isSigningUp,
        signUpError: state.user.signUpError,
        signUpErrorMessage: state.user.signUpErrorMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    doSignupUser: ({email, password}) => {
      dispatch(authActions.doCreateUserWithEmailAndPassword({email, password}))
    },
    pushToHome: () => {
      dispatch(push('/'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
