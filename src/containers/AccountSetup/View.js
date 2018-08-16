import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux'

import WindowContainer from './containers/WindowContainer'
import * as accountSetupActions from './../../store/actions/accountSetupActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'

import * as queryString from 'qs'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name']
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
        <div style={{marginBottom: 24}}>
            <Field name="name" component={renderTextField} label="Organisation Name"/>
        </div>
        <div style={{marginBottom: 24}}>
            <Field name="website" component={renderTextField} label="Organisation Website"/>
        </div>
        <div>
            <Button type="submit" disabled={pristine || submitting}>Submit</Button>
        </div>
    </form>
  )
}

const organisationArray = [
    {
        key: "CORPORATION",
        value: "corporation"
    },
    {
        key:"GOVERNMENT",
        value:"government"
    },
    {
        key: "NON_GOVERNMENTAL_ORGANISATION",
        value:"non-governmental organisation"
    },
    {
        key: "POLITICAL_ORGANISATION",
        value:"political organisation"
    },{
        key: "INTERNATIONAL_ORGANISATION",
        value:"international organisation"
    },{
        key: "ARMED_FORCES",
        value: "armed forces", 
    },{
        key: "CHARITY",
        value: "charity"
    },{
        key: "NOT_FOR_PROFIT_CORPORATION",
        value:"not-for-profit corporations"
    },{
        key: "PARTNERSHIP",
        value:"partnerships"
    },{
        key: "COOPERATIVE",
        value:"cooperatives"
    },{
        key: "EDUCATIONAL_INSTITUTION",
        value:"educational institutions"
    }
]


const categoryArray = [
    {key: "Agriculture", value: "agriculture"},
    {key: "Water", value: "water"},
    {key: "DairyEggsPoultryPork", value: "dairy, eggs, poultry and pork"},
    {key: "Imports", value: "imports"},
    {key: "Exports", value: "exports"},
    {key: "Fisheries", value: "fisheries"},
    {key: "Forestry", value: "forestry" },
    {key: "Constitutional", value: "constitutional"},
    {key: "CompAndConsumer", value: "Competition and Consumer"},
    {key: "Copyright", value: "copyright"},
    {key: "Telecoms", value: "telecommunications"},
    {key: "MediaCommunications", value: "Media and Communications"},
    {key: "Arts", value: "arts"},
    {key: "Education", value: "arts" },
    {key: "Environment", value: "environment" },
    {key: "Energy", value: "energy"},
    {key: "Renewables", value: "renewables" },
    {key: "ScientificResearch", value: "scientific research"},
    {key: "Resources", value: "resources"},
    {key: "Finance", value: "finance" },
    {key: "ForeignAffairsTrade", value: "foreign affairs and trade"},
    {key: "Health", value: "health"},
    {key: "AgedCare", value: "aged care"},
    {key: "Defence", value: "defence"},
    {key: "BiosecurityCustoms", value: "biosecurity and customs"},
    {key: "Migration", value: "migration"},
    {key: "Innovation", value: "innovation"},
    {key: "JobsSmallBusiness", value: "jobs and small business"},
    {key: "OHS", value: "Occupational Health and Safety"},
    {key: "MinorityProtections", value: "Minority Protections"},
    {key: "HigherEducation", value: "Higher Education"},
    {key: "SocialSecurity", value: "Social Security"},
    {key: "Tax", value: "tax"},
    {key: "CorpGov", value: "Corporate Governance"},
    {key: "NFPLaws", value: "Not-For-Profit laws"},
    {key: "Banking", value: "Banking"},
    {key: "Superannuation", value: "superannuation"},
    {key: "Insurance", value: "insurance"},
    {key: "Infrastructure", value: "infrastructure"},
    {key: "Property", value: "property"},
    {key: "Courts", value: "courts" },
    {key: "Manufacturing", value: "manufacturing" },
    {key: "CrimeLawEnforcement", value: "crime and law enforcement"},
    {key: "ParliamentaryMattersLegislativeInterpretation", value: "Parliamentary matters and legislative interpretation"},
    {key: "Aviation", value: "aviation"},
    {key: "NationalSecurityEmergency", value: "National Security and Emergency"},
    {key: "Sporting", value: "Sporting"},
    {key: "Employment", value: "employment" },
    {key:  "Transportation", value: "transportation" }
]

const ButtonTag = (props) => {
    const { classes, isSelected } = props
    return (
        <Button 
            variant="extendedFab" 
            aria-label="delete" 
            onClick={()=>props.onClick()} 
            className={isSelected?classes.buttonChecked:classes.buttonDefault}>
            {props.tag}
        </Button>
    )
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
        accountSetup: state.user.accountSetup,
        isSubmitting: state.organisation.creatingNewOrganisation,
        createNewOrganisationSuccess: state.organisation.createNewOrganisationSuccess,
        newTeamInfo: state.organisation.newTeamInfo,
        createNewOrganisationError:  state.organisation.createNewOrganisationError
    }
}

const WrappedForm = reduxForm({form: 'UserSetupInformationForm',validate})(MaterialUiForm)

class ButtonSelectContainer extends React.Component {
    selectTag = (key) => {
        if (this.props.selected){
            if(this.props.selected.indexOf(key)>-1){
                const index = this.props.selected.indexOf(key)
                this.props.onSelect([...this.props.selected.slice(0, index), ...this.props.selected.slice(index+1)])
            } else {
                this.props.onSelect([ ...this.props.selected, key ])
            }
        }
        else this.props.onSelect([ key ])
    }

    render(){
        const { info, selected } = this.props
        return (
            info.map((tag,i)=><ButtonTagWithStyles isSelected={selected&&selected.indexOf(tag.key)>-1} onClick={()=>this.selectTag(tag.key)} key={tag.key} tag={tag.value}/>)
        )
    }
}

const ViewSwitch = (props) => {
    const { newTeamInfo, isSubmitting, createNewOrganisationSuccess, createNewOrganisationError } = props
    const stepInformation = {
        "lets-setup-your-team": {
            title: "Welcome to Polibase!",
            subtitle: "Let's get you started by setting up your team",
            content: <img src="https://media.giphy.com/media/RwwsIbudZHVhC/giphy.gif" alt=""/>,
            progressButtonCaption: `Do you want to setup your team now?`,
            progressButtonText: "LET'S DO IT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 0,
            progressButtonOnClick: ()=>{
                props.progressToNextStep("lets-setup-your-team")
                props.history.push(`/create-new-team?${queryString.stringify({
                    page: 2,
                    step: "tell-us-about-your-team"
                })}`)
            },
            isProgressButtonDisabled: false
        },
        "tell-us-about-your-team": {
            title: "Tell us a little more about team",
            content:  <WrappedForm onSubmit={e=>props.submitTeamInformation(e)}/>,
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 1,
            progressButtonOnClick: ()=>{
                props.progressToNextStep("tell-us-about-your-team")
                props.history.push(`/create-new-team?${queryString.stringify({
                    page: 3,
                    step: "team-information"
                })}`)
            },
            isProgressButtonDisabled: !(newTeamInfo&&newTeamInfo.name)
        },
        "team-information": {
            title: "What type of team are you?",
            subtitle: "Select all that apply to you",
            content: <ButtonSelectContainer onSelect={e=>props.submitTeamOrganisationType({organisationType: e})} selected={newTeamInfo&&newTeamInfo.organisationType} info={organisationArray}/>,
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 2,
            progressButtonOnClick: ()=>{
                props.progressToNextStep("team-information")
                props.history.push(`/create-new-team?${queryString.stringify({
                    page: 4,
                    step: "interest-areas"
                })}`)
            },
            isProgressButtonDisabled: !(newTeamInfo&&newTeamInfo.organisationType)
        },
        "interest-areas": {
            title: "Pick your additional interest areas",
            subtitle: "We have already selected some for you based on your previous answers",
            content: <ButtonSelectContainer onSelect={e=>props.submitTeamInterestCategories({interestCategories: e})} selected={newTeamInfo&&newTeamInfo.interestCategories} info={categoryArray}/>,
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 3,
            progressButtonOnClick: ()=>{
                props.progressToNextStep("interest-areas")
                props.history.push(`/create-new-team?${queryString.stringify({
                    page: 5,
                    step: "setting-up"
                })}`)
                props.submitCreateNewTeam()
            },
            isProgressButtonDisabled: !(newTeamInfo&&newTeamInfo.interestCategories)
        },
        "setting-up": {
            title: "Sit tight, we are just setting everything up",
            subtitle: "This shouldn't take too long. While you wait why don't you go throw a frisbee with the neighbourhood dog.",
            content: createNewOrganisationSuccess?<div style={{display: "flex", justifyContent: "center", flexDirection:"column"}}><div style={{marginBottom: 16}}>Successfully created {newTeamInfo.name} team!</div></div>:createNewOrganisationError?<div style={{display: "flex", justifyContent: "center", flexDirection:"column"}}><div style={{marginBottom: 16}}>Oh no! Something went wrong!</div><Button color="secondary" variant="contained" onClick={()=>props.submitCreateNewTeam()}>Try again</Button></div>:<CircularProgress size={100} />,
            progressButtonCaption: `Once you have finished press "next" to continue`,
            progressButtonText: "NEXT",
            hideForwardIcon: false,
            numberOfProgressSteps: 6,
            progressStepNumber: 4,
            progressButtonOnClick: ()=>{
                props.progressToNextStep("setting-up")
                props.history.push(`/create-new-team?${queryString.stringify({
                    page: 6,
                    step: "complete"
                })}`)
            },
            isProgressButtonDisabled: !createNewOrganisationSuccess||isSubmitting
        },
        "complete": {
            title: "Guess what? You're ready to rock!",
            subtitle: "Thanks for bearing with us while we did that. You are now ready to explore.",
            content: <img src="https://media.giphy.com/media/26DOoDwdNGKAg6UKI/giphy.gif" alt="" height={300}/>,
            progressButtonCaption: `Click below to go to your new homepage`,
            progressButtonText: "DONE!",
            hideForwardIcon: true,
            numberOfProgressSteps: 6,
            progressStepNumber: 5,
            progressButtonOnClick: ()=>{
                props.progressToNextStep("complete")
                props.history.push(`/team?${queryString.stringify({
                    page: "welcome-to-your-new-team"
                })}`)
            },
            isProgressButtonDisabled: false
        }
    }

    switch(props.accountSetup.setupStep){
        case "lets-setup-your-team":
            return <WindowContainer {...stepInformation["lets-setup-your-team"]} {...props}/>
        case "tell-us-about-your-team":
            return <WindowContainer {...stepInformation["tell-us-about-your-team"]} {...props}/>
        case "team-information":
            return <WindowContainer {...stepInformation["team-information"]} {...props}/>
        case "interest-areas":
            return <WindowContainer {...stepInformation["interest-areas"]} {...props}/>
        case "setting-up":
            return <WindowContainer {...stepInformation["setting-up"]} {...props}/>
        case "complete":
            return <WindowContainer {...stepInformation["complete"]} {...props}/>
        default:
            return <WindowContainer {...stepInformation["lets-setup-your-team"]} {...props}/>
    }
}

export default connect(mapStateToProps, {...accountSetupActions})(ViewSwitch)