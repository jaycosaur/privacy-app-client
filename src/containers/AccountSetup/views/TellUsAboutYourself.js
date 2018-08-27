import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Container from './../containers/Container'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import * as actions from './../../../store/actions/accountActions'
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        height: "92vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)"
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    flexCenter: {
        display: "flex", justifyContent: "space-around",
    },
    centerText: {
        textAlign: "center"
    },
    progressButton: {
        width: "40%",
    },
    containerCard: {
        width: 500,
        height: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0
    },
    upperCard: {
        marginBottom: 2*theme.spacing.unit,
        marginTop: 2*theme.spacing.unit,
    },
    middleCard: {
        paddingBottom: 2*theme.spacing.unit,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        height: "100%"
    },
    bottomCard: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2*theme.spacing.unit,
    }
  })

const validate = values => {
    const errors = {}
    const requiredFields = [ 'displayName']
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    return errors
}

const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error } }) => (
    <TextField 
    label={(touched && error)?error:label}
    error={touched && error}
    value={value}
    onChange={onChange}
    fullWidth
    />
)

const MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
    <form onSubmit={handleSubmit} style={{width: "100%"}}>
        <div style={{marginBottom: 40, paddingLeft: 16, paddingRight: 16}}>
            <Field name="displayName" component={renderTextField} label="Your Name"/>
        </div>
        <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
            <Button style={{width: "50%"}} type="submit" variant="extendedFab" aria-label="delete" color="secondary" disabled={pristine || submitting}>Submit</Button>
        </div>
    </form>
    )
}

const WrappedForm = reduxForm({form: 'UserSetupInformationForm',validate})(MaterialUiForm)

const View = (props) => {
    const { classes } = props
    return (
        <Container>
            <CardContent className={classes.containerCard}>
                <Typography variant="display1" gutterBottom className={classes.centerText} color="primary">
                    Tell us about yourself
                </Typography>
                <Typography variant="subheading" className={classes.centerText}>
                    To help your team mates know who you are what is your name?
                </Typography>
                <WrappedForm onSubmit={props.updateAccountInformation}/>
            </CardContent>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.accountInformation
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(View))
