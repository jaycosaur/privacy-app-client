import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import { withStyles } from '@material-ui/core/styles';
import Container from './../containers/Container'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import * as actions from './../../../store/actions/accountActions'
import { connect } from 'react-redux'

const ButtonTag = (props) => {
    const { classes, isSelected } = props
    return (
        <Button 
            variant="extendedFab" 
            aria-label="delete" 
            onClick={()=>props.onClick()} 
            className={isSelected?classes.buttonChecked:classes.buttonDefault}
            >
            {props.tag}
        </Button>
    )
}

const buttonStyles = theme => ({
    buttonDefault: {
        margin: 0.5*theme.spacing.unit,
        minWidth: 100
    },
    buttonChecked: {
        minWidth: 100,
        background: "linear-gradient(45deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        color: "white",
        margin: 0.5*theme.spacing.unit,
        '&:hover': {
            background: "linear-gradient(0deg, rgba(98,58,162,1) 0%, rgba(249,119,148,1) 100%)",
        },
    }
});

const ButtonTagWithStyles = withStyles(buttonStyles)(ButtonTag)

class ButtonSelectContainer extends React.Component {
    selectTag = (key) => {
        this.props.onSelect(key)
    }

    render(){
        const { info, selected } = this.props
        return (
            info.map((tag,i)=><ButtonTagWithStyles isSelected={selected===tag.key} onClick={()=>this.selectTag(tag.key)} key={tag.key} tag={tag.value}/>)
        )
    }
}

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

const teamSizeOptions = [
    {key: "1", value: "ONLY ME"},
    {key: "2", value: "2 to 5"},
    {key: "5", value: "5 to 15"},
    {key: "15", value: "15 to 25"},
    {key: "25", value: "25 to 100"},
    {key: "100", value: "100 +"},
]

class MaterialUiForm extends React.Component {
    render(){
        const { handleSubmit, pristine, reset, submitting, isLoading, hasCreatedNewTeam } = this.props
        return (
            <form onSubmit={handleSubmit} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 16}}>
                {!isLoading?<div style={{marginBottom: 40, paddingLeft: 16, paddingRight: 16}}>
                    <Field name="name" component={renderTextField} label="Organisation Name"/>
                    <Field name="website" component={renderTextField} label="Organisation Website (optional)"/>
                    <Typography variant="subheading" gutterBottom style={{marginTop: 32}} align="center">How many people are there in your company?</Typography>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                        <ButtonSelectContainer onSelect={this.props.onSelect} info={teamSizeOptions} selected={this.props.selected}/>
                    </div>
                </div>:<CircularProgress size={80} style={{marginTop: 32, marginBottom: 32}}/>}
                <div style={{width: "100%", flex: 1, display: "flex", justifyContent: "center", marginTop: 16}}>
                    <Button style={{width: "50%", color: "#fff"}} type="submit" variant="extendedFab" aria-label="delete" color="secondary" disabled={isLoading || pristine || submitting}>{hasCreatedNewTeam?"Complete":(isLoading?"CREATING":"Create Team")}</Button>
                </div>
            </form>
        )

    }
    
}

const WrappedForm = reduxForm({form: 'UserSetupInformationForm',validate})(MaterialUiForm)

class View extends React.Component {
    state = {
        selected: "1"
    }

    onSelect = (inp) => {
        this.setState({selected: inp})
    }


    handleSubmit = (e) => {
        this.props.createOrganisationFromFields({name: e.name, website: e.website, companySize: this.state.selected})
    }

    render(){
        const { classes, isSubmittingCreateTeam,hasCreatedNewTeam } = this.props
        return (
            <Container>
                <CardContent className={classes.containerCard}>
                    <Typography variant="display1" gutterBottom className={classes.centerText} color="primary">
                        {isSubmittingCreateTeam?"Just setting up your team":"Tell us about your team"}
                    </Typography>
                    <WrappedForm completed={hasCreatedNewTeam} isLoading={isSubmittingCreateTeam} onSubmit={this.handleSubmit} onSelect={this.onSelect} selected={this.state.selected}/>
                </CardContent>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop,
        isSubmittingCreateTeam: state.organisation.isSubmittingCreateTeam,
        hasCreatedNewTeam: state.organisation.hasCreatedNewTeam,
    }
}

export default connect(mapStateToProps, actions)(withStyles(styles)(View))
