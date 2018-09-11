import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => {
    return ({
    mainCard: {
        maxWidth: 500
    },
    container: {
        flexGrow: 1,
        paddingTop: 32,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    root: {
      flexGrow: 1,
      height: "100vh"
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
    formContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2em",
        background: theme.palette.secondary.main
    },
    titleContainer: {
        background: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "8em",
        [theme.breakpoints.down('sm')]: {
            padding: "4em"
        }
    },
    mainText: {
        [theme.breakpoints.down('sm')]: {
            ...theme.typography.display1,
            color: "white",
            fontWeight: 500,
        },
        [theme.breakpoints.up('md')]: {
            ...theme.typography.display4,
            color: "white",
            fontWeight: 500,
        },
    },
    secondaryText: {
        color: "white",
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            ...theme.typography.display2,
            color: "white",
            fontWeight: 300,
            textAlign: "center",
            marginTop: 64
        },
    },
    formCard: {
        maxWidth: 400,
        [theme.breakpoints.down('xs')]: {
            height: "60%"
        },
    },
    signinButton: {
        background: theme.palette.primary.main,
        color: "white"
    }
  })};
  


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
        value={value}
        onChange={onChange}
        fullWidth
        error={touched && error}
        {...custom}
        margin="dense"
    />
)

const InputWrap = (props) => (
    <div
        style={{
            width: "100%",
            background: "#eee",
            borderRadius: 8,
            padding: 8,
            paddingLeft: 32,
            paddingRight: 32,
            marginBottom: 16
        }}>
        {props.children}
    </div>
)
  
const MaterialUiForm = props => {
    const { handleSubmit, submitting} = props
    return (
        <form onSubmit={handleSubmit} onKeyPress={e=>e.key==="Enter"&&handleSubmit}>
            <InputWrap>
                <Field name="email" suggested="current-email" component={renderTextField} placeholder="Email address"/>
            </InputWrap>
            <InputWrap>
                <Field suggested="current-password" name="password" component={renderTextField} placeholder="Password" type="password"/>
            </InputWrap>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button 
                    color="primary" 
                    disabled={ submitting || props.isLoading}
                    variant="contained" 
                    size="large"
                    type="submit"
                    className={props.classes.signinButton}
                    >
                    <strong>SIGN-IN</strong>{props.isLoading&&"..."}
                </Button>
                <div><Link to="/signin/resetpassword">Forgot password</Link></div>
            </div>
            
            <Typography align="center" variant="subheading" style={{marginTop: 24, width: "100%"}}><Link to="/signin/signup" style={{width: "100%", textAlign: "center", fontWeight: 300}}>Not a member? <strong>Signup now</strong>.</Link></Typography>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'signinUserForm', validate})(MaterialUiForm)

const Signin = (props) => {
    if (props.signInError&&props.signInErrorMessage){
        message.error(props.signInErrorMessage)
    }
    const { classes } = props
    return (
        <div className={classes.container}>
            <Card className={classes.mainCard}>
                <CardContent>
                    <Typography variant="display2" align="left" gutterBottom>Sign-in</Typography>
                    <Typography variant="title" align="left" style={{marginBottom: 32}} gutterBottom>
                        Managing compliance has never been this easy.
                    </Typography>
                    <WrappedForm isLoading={props.isSigningIn} onSubmit={props.signInWithEmailAndPassword} classes={classes}/>
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isSigningIn: state.user.isSigningIn,
        signInError: state.user.signInError,
        signInErrorMessage: state.user.signInErrorMessage&&state.user.signInErrorMessage.code
    }
}

export default connect(mapStateToProps, authActions)(withStyles(styles)(Signin))
