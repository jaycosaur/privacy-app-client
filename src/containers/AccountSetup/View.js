import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux'

import WindowContainer from './containers/WindowContainer'
import * as accountSetupActions from './../../store/actions/accountSetupActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'
import RadioButton from '@material-ui/core/Radio';
import RadioButtonGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox'
import SelectField from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ]
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
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="firstName" component={renderTextField} label="First Name"/>
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name"/>
      </div>
      <div>
        <Field name="email" type="email" component={renderTextField} label="Email"/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  )
}

const organisationArray = ["corporations", 
"governments", 
"non-governmental organisations", 
"political organisations", 
"international organisations", 
"armed forces", 
"charities", 
"not-for-profit corporations", 
"partnerships", 
"cooperatives",
"educational institutions"]


const categoryArray = ["invent",
  "fixed",
  "long",
  "whine",
  "pigs",
  "need",
  "sincere",
  "memory",
  "cup",
  "wind",
  "mean",
  "unique",
  "bad",
  "treat",
  "hands",
  "battle",
  "sore",
  "permit",
  "gaze",
  "fish",
  "nauseating",
  "drum",
  "snore",
  "handy"]

class ButtonTag extends React.Component {
    state = {
        isSelected: false
    }

    toggleSelect = () => {
        this.setState(({isSelected})=>({isSelected: !isSelected}))
    }
    render(){
        const { classes } = this.props
        return (
            <Button variant="extendedFab" aria-label="delete" onClick={this.toggleSelect} className={this.state.isSelected?classes.buttonChecked:classes.buttonDefault}>
                {this.props.tag}
            </Button>
        )
    }
}

const buttonStyles = theme => ({
    buttonDefault: {
        margin: 0.5*theme.spacing.unit
    },
    buttonChecked: {
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        color: "white",
        margin: 0.5*theme.spacing.unit,
        '&:hover': {
            background: "linear-gradient(0deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        },
    }
});

const ButtonTagWithStyles = withStyles(buttonStyles)(ButtonTag)

const mapStateToProps = (state) => {
    return {
        accountSetup: state.user.accountSetup
    }
}

const WrappedForm = reduxForm({form: 'UserSetupInformationForm',validate})(MaterialUiForm)

const ViewSwitch = (props) => {
    const stepInformation = {
        "lets-setup-your-account": {
            title: "Welcome to Polity!",
            subtitle: "Let's get you started by setting up your account",
            content: <img src="https://media.giphy.com/media/RwwsIbudZHVhC/giphy.gif" />,
            progressButtonCaption: `Do you want to setup your account now?`,
            progressButtonText: "LET'S DO IT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 0,
            progressButtonOnClick: ()=>props.progressToNextStep("lets-setup-your-account"),
            isProgressButtonDisabled: false
        },
        "tell-us-about-yourself": {
            title: "Tell us a little more about yourself",
            subtitle: "We have already selected some for you based on your previous answers",
            content:  <WrappedForm onSubmit={e=>console.log(e)}/>,
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 1,
            progressButtonOnClick: ()=>props.progressToNextStep("tell-us-about-yourself"),
            isProgressButtonDisabled: false
        },
        "organisation-information": {
            title: "What type of organisation are you?",
            subtitle: "Select all that apply to you",
            content: organisationArray.map((tag,i)=><ButtonTagWithStyles key={i+"a"} tag={tag}/>),
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 2,
            progressButtonOnClick: ()=>props.progressToNextStep("organisation-information"),
            isProgressButtonDisabled: false
        },
        "interest-areas": {
            title: "Pick your additional interest areas",
            subtitle: "We have already selected some for you based on your previous answers",
            content: categoryArray.map((tag,i)=><ButtonTagWithStyles key={i} tag={tag}/>),
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 3,
            progressButtonOnClick: ()=>props.progressToNextStep("interest-areas"),
            isProgressButtonDisabled: false
        },
        "setting-up": {
            title: "Sit tight, we are just setting everything up",
            subtitle: "This shouldn't take too long. While you wait why don't you go throw a frisbee with the neighbourhood dog.",
            content: <CircularProgress size={100} />,
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 4,
            progressButtonOnClick: ()=>props.progressToNextStep("setting-up"),
            isProgressButtonDisabled: false
        },
        "complete": {
            title: "Guess what? You're ready to rock!",
            subtitle: "Thanks for bearing with us while we did that. You are now ready to explore.",
            content: <img src="https://media.giphy.com/media/26DOoDwdNGKAg6UKI/giphy.gif" height={300}/>,
            progressButtonCaption: `Click below to go to your new homepage`,
            progressButtonText: "DONE!",
            hideForwardIcon: true,
            numberOfProgressSteps: 6,
            progressStepNumber: 5,
            progressButtonOnClick: ()=>props.progressToNextStep("complete"),
            isProgressButtonDisabled: false
        }
    }

    switch(props.accountSetup.setupStep){
        case "lets-setup-your-account":
            return <WindowContainer {...stepInformation["lets-setup-your-account"]} {...props}/>
        case "tell-us-about-yourself":
            return <WindowContainer {...stepInformation["tell-us-about-yourself"]} {...props}/>
        case "organisation-information":
            return <WindowContainer {...stepInformation["organisation-information"]} {...props}/>
        case "interest-areas":
            return <WindowContainer {...stepInformation["interest-areas"]} {...props}/>
        case "setting-up":
            return <WindowContainer {...stepInformation["setting-up"]} {...props}/>
        case "complete":
            return <WindowContainer {...stepInformation["complete"]} {...props}/>
    }
}

export default connect(mapStateToProps, {...accountSetupActions})(ViewSwitch)